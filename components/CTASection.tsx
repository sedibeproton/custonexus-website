import PrimaryButton from "@/components/PrimaryButton";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

interface CTASectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

export default function CTASection({
  title,
  subtitle,
  buttonText,
  buttonLink,
}: CTASectionProps) {
  return (
    <Section spacing="lg" className="relative isolate overflow-hidden bg-gradient-to-br from-blue-950 via-[#07327c] to-blue-700 text-white">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(96,165,250,0.28),transparent_32%)]" />
      <div className="mx-auto max-w-5xl text-center">
        <SectionHeader
          eyebrow=""
          title={title}
          subtitle={subtitle}
          align="center"
          variant="inverted"
          showUnderline={false}
        />

        <div className="mt-12 flex justify-center">
          <PrimaryButton href={buttonLink} size="lg">
            {buttonText}
          </PrimaryButton>
        </div>
      </div>
    </Section>
  );
}
