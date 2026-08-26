import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";

import Container from "@/components/Container";
import CTASection from "@/components/CTASection";
import FadeSection from "@/components/FadeSection";
import PageHero from "@/components/PageHero";
import PageWrapper from "@/components/PageWrapper";
import SectionHeader from "@/components/SectionHeader";
import { getServicePage, servicePages } from "@/lib/service-pages";

const siteUrl = "https://custonexus.com";

export function generateStaticParams() {
  return servicePages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const service = getServicePage((await params).slug);

  if (!service) return {};

  const path = `/services/${service.slug}`;
  return {
    title: service.pageTitle,
    description: service.description,
    alternates: { canonical: path },
    openGraph: {
      title: service.pageTitle,
      description: service.description,
      url: path,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const service = getServicePage((await params).slug);
  if (!service) notFound();

  const pageUrl = `${siteUrl}/services/${service.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
          { "@type": "ListItem", position: 3, name: service.title, item: pageUrl },
        ],
      },
      {
        "@type": "Service",
        name: service.title,
        description: service.description,
        url: pageUrl,
        provider: { "@type": "Organization", name: "CustoNexus Technologies", url: siteUrl },
        areaServed: { "@type": "Country", name: "South Africa" },
      },
    ],
  };

  return (
    <PageWrapper>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <PageHero eyebrow="CustoNexus Services" title={service.pageTitle} subtitle={service.introduction} />

      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white">
        <Container className="flex flex-wrap items-center gap-2 py-4 text-sm text-slate-600">
          <Link href="/" className="hover:text-blue-700">Home</Link><ChevronRight size={15} aria-hidden />
          <Link href="/services" className="hover:text-blue-700">Services</Link><ChevronRight size={15} aria-hidden />
          <span aria-current="page" className="font-semibold text-slate-900">{service.title}</span>
        </Container>
      </nav>

      <FadeSection>
        <section className="bg-white py-16 sm:py-24">
          <Container>
            <SectionHeader eyebrow="What We Provide" title={`Explore ${service.title}`} subtitle={service.description} />
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-[2rem] bg-gradient-to-br from-blue-950 to-blue-700 p-8 text-white shadow-xl sm:p-10">
                <h2 className="text-2xl font-bold">Key capabilities</h2>
                <ul className="mt-7 space-y-4">
                  {service.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 leading-7 text-blue-50"><CheckCircle2 className="mt-1 shrink-0 text-blue-300" size={19} aria-hidden />{item}</li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-5">
                {service.sections.map((section) => (
                  <article key={section.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-7 transition hover:border-blue-200 hover:bg-white hover:shadow-lg sm:p-8">
                    <h2 className="text-2xl font-bold text-slate-950">{section.title}</h2>
                    <p className="mt-4 leading-8 text-slate-600">{section.text}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="mt-10 flex justify-center">
              <Link href="/services" className="inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-800">Explore all service categories <ArrowRight size={18} aria-hidden /></Link>
            </div>
          </Container>
        </section>
      </FadeSection>

      <FadeSection>
        <CTASection title={`Let’s Discuss ${service.title}`} subtitle="Tell us what your organisation needs and we will help identify a practical next step." buttonText="Contact CustoNexus" buttonLink="/contact" />
      </FadeSection>
    </PageWrapper>
  );
}
