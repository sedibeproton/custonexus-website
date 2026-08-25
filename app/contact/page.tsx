import PageWrapper from "@/components/PageWrapper";
import PageHero from "@/components/PageHero";
import FadeSection from "@/components/FadeSection";
import Container from "@/components/Container";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with CustoNexus Technologies to explore healthcare partnerships, digital solutions, and service opportunities.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

const contactMethods = [
  {
    title: "Email Support",
    description: "Send a message to our team for partnership enquiries, product questions, or service requests.",
    action: "mailto:hello@custonexus.tech",
    label: "hello@custonexus.tech",
  },
  {
    title: "Book a Call",
    description: "Schedule a conversation to discuss your healthcare challenges and roadmap needs.",
    action: "mailto:hello@custonexus.tech",
    label: "Schedule a call",
  },
  {
    title: "Partnerships",
    description: "Explore collaboration opportunities with healthcare providers, technology partners and organisations.",
    action: "mailto:hello@custonexus.tech",
    label: "Partner with us",
  },
];

export default function ContactPage() {
  return (
    <PageWrapper>
      <PageHero
        eyebrow="Contact"
        title="Start a high-value healthcare partnership."
        subtitle="Reach out to discuss how CustoNexus can support your digital healthcare strategy with trusted delivery, operational clarity and meaningful outcomes."
      />

      <FadeSection>
      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {contactMethods.map((method) => (
              <div
                key={method.title}
                className="rounded-[2rem] border border-slate-200 bg-slate-50 p-10 shadow-lg"
              >
                <h2 className="text-2xl font-semibold text-slate-900">
                  {method.title}
                </h2>
                <p className="mt-4 text-slate-600 leading-8">
                  {method.description}
                </p>
                <div className="mt-8">
                  <PrimaryButton href={method.action}>{method.label}</PrimaryButton>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-[2rem] bg-slate-950 p-12 text-white shadow-2xl">
            <h2 className="text-3xl font-bold">Need a quick response?</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              Tell us about your project and we will share a tailored overview of how CustoNexus can help you improve care and operations.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <SecondaryButton href="mailto:hello@custonexus.tech">Email our team</SecondaryButton>
              <span className="text-sm text-slate-400">
                Or reach us from anywhere in the world by email.
              </span>
            </div>
          </div>
        </Container>
      </section>
      </FadeSection>

    </PageWrapper>
  );
}
