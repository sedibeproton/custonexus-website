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
    <Section spacing="lg" className="bg-gradient-to-br from-slate-950 via-blue-900 to-blue-700 text-white">
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