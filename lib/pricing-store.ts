import { connection } from "next/server";
import { postgresRows } from "@/lib/db/postgres";
import { getPersistenceBackend } from "@/lib/persistence-mode";
import { pricingGroups, pricingEntries, type PricingEntry } from "@/lib/pricing";

type Catalogue = { revision: number; entries: PricingEntry[] };

export async function getCatalogue(): Promise<Catalogue> {
  await connection();
  if (getPersistenceBackend() !== "postgres") return { revision: 0, entries: pricingEntries };
  const [catalogue] = await postgresRows<Catalogue>("SELECT revision, entries FROM pricing_catalogue WHERE singleton");
  if (!catalogue) throw new Error("Pricing catalogue is not initialized.");
  return catalogue;
}

export async function getPublicPricing() {
  return (await getCatalogue()).entries.filter(({ active }) => active);
}

export async function getPublicPricingGroups() {
  const entries = await getPublicPricing();
  return pricingGroups.map((group) => ({
    ...group,
    entries: entries.filter((entry) => entry.service === group.service &&
      (group.entries.some(({ id }) => entry.id === id) ||
        (!pricingEntries.some(({ id, service }) => entry.id === id && entry.service === service) &&
          pricingGroups.find(({ service }) => service === entry.service) === group))),
  })).filter((group) => group.entries.length);
}

export async function publishPricingEntry(entry: PricingEntry, revision: number, creating: boolean) {
  const rows = await postgresRows<Catalogue>(
    `UPDATE pricing_catalogue
     SET entries = CASE WHEN $4 THEN entries || jsonb_build_array($1::jsonb)
       ELSE (SELECT jsonb_agg(CASE WHEN value->>'id' = $2 THEN $1::jsonb ELSE value END ORDER BY position)
             FROM jsonb_array_elements(entries) WITH ORDINALITY AS items(value, position)) END,
         revision = revision + 1, updated_at = now()
     WHERE singleton AND revision = $3
       AND (EXISTS (SELECT 1 FROM jsonb_array_elements(entries) AS element WHERE element->>'id' = $2)) <> $4
     RETURNING revision, entries`,
    [JSON.stringify(entry), entry.id, revision, creating],
  );
  return rows[0];
}
