import Link from "next/link";
import Container from "@/components/Container";
import PricingCards from "@/components/PricingCards";
import { getPublicPricing } from "@/lib/pricing-store";

export default async function PricingPreview({ ids }: { ids: string[] }) {
  const entries = (await getPublicPricing()).filter(({ id }) => ids.includes(id));
  return <section>
    <Container className="py-10">
      <h2 className="text-2xl font-bold text-blue-950">Pricing at a glance</h2>
      <PricingCards entries={entries} />
      <Link href="/pricing" className="mt-5 inline-block font-bold text-blue-800 underline">View All Pricing</Link>
    </Container>
  </section>;
}
