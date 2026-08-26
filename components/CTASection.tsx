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
    <Section spacing="lg" className="bg-[#f7f9fc] text-white">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-[#071a3d] px-6 py-16 text-center shadow-[0_30px_90px_rgba(7,26,61,.22)] sm:px-12 sm:py-20">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(37,99,235,.45),transparent_35%),radial-gradient(circle_at_10%_100%,rgba(16,185,129,.16),transparent_28%)]" />
        <div aria-hidden className="absolute inset-0 opacity-10 [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="relative mx-auto max-w-4xl">
        <SectionHeader
          eyebrow=""
          title={title}
          subtitle={subtitle}
          align="center"
          variant="inverted"
          showUnderline={false}
        />

        <div className="mt-10 flex justify-center">
          <PrimaryButton href={buttonLink} size="lg">
            {buttonText}
          </PrimaryButton>
        </div>
        </div>
      </div>
    </Section>
  );
}
