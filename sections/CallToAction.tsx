import Section from "@/components/Section";
import PrimaryButton from "@/components/PrimaryButton";
import SectionHeader from "@/components/SectionHeader";

export default function CallToAction() {
  return (
    <Section className="relative overflow-hidden bg-blue-700 text-white" spacing="lg">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_40%)]" />

      <div className="relative mx-auto max-w-5xl text-center">
        <SectionHeader
          eyebrow="Let’s Build Better Healthcare"
          title="Ready to Partner With CustoNexus?"
          subtitle="Whether you’re a healthcare practice, supplier, technology provider or healthcare organisation, we’d love to explore how we can work together."
          align="center"
          variant="inverted"
        />

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <PrimaryButton href="/contact" size="lg">
            Start the Conversation
          </PrimaryButton>

          <PrimaryButton href="/about" size="lg" className="border-2 border-white bg-transparent hover:bg-white hover:text-blue-700">
            Learn More
          </PrimaryButton>
        </div>
      </div>
    </Section>
  );
}