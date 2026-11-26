import { randomUUID } from "node:crypto";
import { requireBusinessAccess } from "@/lib/business/api";
import { getPersistenceBackend } from "@/lib/persistence-mode";
import { pricingGroups, type PricingEntry } from "@/lib/pricing";
import { publishPricingEntry } from "@/lib/pricing-store";

export async function PUT(request: Request) {
  const auth = await requireBusinessAccess(true);
  if ("error" in auth) return auth.error;
  if (getPersistenceBackend() !== "postgres") return Response.json({ error: "PostgreSQL is required." }, { status: 503 });
  try {
    const { entry, revision } = await request.json();
    const creating = entry.id === "";
    const clean = (value: unknown, maximum: number) => {
      if (typeof value !== "string" || value.length > maximum) throw new Error("Invalid text field");
      return value.trim();
    };
    const service = pricingGroups.find((group) => group.service === entry.service)?.service;
    const name = clean(entry.name, 120);
    const billing = clean(entry.billing, 80);
    if (!service || !name || !billing || !Number.isSafeInteger(revision) ||
        (!creating && !/^[a-z0-9-]{1,100}$/.test(entry.id)) ||
        !["fixed", "starting", "quotation"].includes(entry.type) ||
        (entry.type !== "quotation" && (!Number.isSafeInteger(entry.price) || entry.price < 1 || entry.price > 100000000)) ||
        !Array.isArray(entry.inclusions) || entry.inclusions.length > 30 ||
        typeof entry.active !== "boolean" || typeof entry.featured !== "boolean") {
      return Response.json({ error: "Check the entry fields and enter a positive whole-rand price for priced entries." }, { status: 400 });
    }
    const validated: PricingEntry = {
      id: creating ? randomUUID() : entry.id, name, service, serviceUrl: `/services/${service}`,
      description: clean(entry.description, 2000), exclusions: clean(entry.exclusions, 2000),
      inclusions: entry.inclusions.map((item: unknown) => clean(item, 300)).filter(Boolean),
      price: entry.type === "quotation" ? null : entry.price,
      type: entry.type, billing, active: entry.active, featured: entry.featured,
    };
    const result = await publishPricingEntry(validated, revision, creating);
    return result ? Response.json(result) : Response.json({ error: "The catalogue changed. Reload before publishing." }, { status: 409 });
  } catch (error) {
    if (error instanceof SyntaxError || error instanceof TypeError || (error instanceof Error && error.message === "Invalid text field")) {
      return Response.json({ error: "Invalid catalogue entry." }, { status: 400 });
    }
    console.error("Catalogue publishing failed", error instanceof Error ? error.name : "Unknown error");
    return Response.json({ error: "Unable to publish pricing." }, { status: 500 });
  }
}
