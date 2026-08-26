import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Mail, MessageCircle, Phone, ShieldCheck } from "lucide-react";

import ConstitutionChapter from "@/components/ConstitutionChapter";
import Container from "@/components/Container";
import FadeSection from "@/components/FadeSection";
import PageHero from "@/components/PageHero";
import PageWrapper from "@/components/PageWrapper";

export const metadata: Metadata = {
  title: "The CustoNexus Constitution",
  description: "The enduring purpose, principles and commitments that guide CustoNexus Technologies in how we lead, serve, innovate and build trust across healthcare.",
  alternates: { canonical: "/constitution" },
  openGraph: { title: "The CustoNexus Constitution", description: "Our enduring standard for purposeful healthcare technology, trusted partnership and people-first service.", url: "/constitution" },
};

const navigation = [
  ["purpose", "Purpose"], ["people", "People"], ["integrity", "Integrity"],
  ["innovation", "Innovation"], ["partnership", "Partnership"],
  ["stewardship", "Stewardship"], ["continuity", "Continuity"],
];

export default function ConstitutionPage() {
  return (
    <PageWrapper>
      <PageHero eyebrow="Founder's Edition · Version 1.0" title="The CustoNexus Constitution" subtitle="A living standard for how we think, decide, serve and build—today and for every generation that follows." />

      <nav aria-label="Constitution chapters" className="sticky top-[88px] z-30 border-y border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <Container className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {navigation.map(([id, label], index) => <a key={id} href={`#${id}`} className="shrink-0 rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-800"><span className="mr-2 text-slate-300">0{index + 1}</span>{label}</a>)}
        </Container>
      </nav>

      <FadeSection>
        <section className="relative overflow-hidden bg-white py-20 sm:py-28">
          <Container>
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-xl shadow-blue-700/20"><BookOpen size={30} aria-hidden /></div>
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.28em] text-blue-700">Preamble</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-blue-950 sm:text-5xl">Why this document exists.</h2>
              </div>
              <div className="space-y-6 text-lg leading-9 text-slate-600">
                <p className="text-2xl font-medium leading-10 text-blue-950">Healthcare is one of humanity&apos;s greatest responsibilities. The work we do around it must be worthy of the trust it carries.</p>
                <p>CustoNexus Technologies was founded on a simple conviction: technology, medical solutions and professional expertise create their greatest value when they strengthen people and improve the experience of care.</p>
                <p>Every day, healthcare professionals carry the privilege and pressure of protecting life, restoring health and supporting families. Their work demands knowledge, courage, compassion and consistency. They deserve partners who understand the weight of that responsibility and who are prepared to meet it with the same seriousness.</p>
                <p>Meaningful connections are the foundation of exceptional healthcare. Systems become stronger when people can trust one another, when information moves with clarity and when technology removes rather than creates friction.</p>
                <p>This Constitution defines the principles that must remain steady as our company, capabilities and world evolve. It is not a ceremonial document. It is a practical standard for our decisions, our relationships and the impact we choose to create.</p>
                <p>Our solutions will evolve. New technologies will emerge. Markets, regulations and expectations will change. This document exists so that progress never requires us to forget who we are.</p>
                <p>Every person who represents CustoNexus shares responsibility for understanding these commitments, living them through action and carrying them forward with courage.</p>
                <p>The Constitution is not merely to be read. It is to be understood, questioned, protected and expressed through the quality of our daily work.</p>
                <div className="rounded-[1.75rem] bg-[#071a3d] p-7 text-white sm:p-9"><p className="text-sm font-bold uppercase tracking-[0.24em] text-blue-200">Our enduring declaration</p><p className="mt-4 text-2xl font-semibold leading-9">We exist to make healthcare better than we found it—and to build an organisation worthy of the people it serves.</p></div>
              </div>
            </div>
          </Container>
        </section>
      </FadeSection>

      <FadeSection><ConstitutionChapter id="purpose" number="01" eyebrow="Article One" title="Purpose Before Ambition" statement="Success matters most when it improves the lives and work of others." principles={["Measure progress by meaningful healthcare impact.", "Choose work that advances a genuine need.", "Keep purpose visible in every major decision.", "Build value that can endure beyond a transaction."]} reflection="Will this decision help make healthcare better than we found it?">
        <p>Commercial strength allows us to grow, invest and serve. It is necessary, but it is not our highest purpose. Revenue, recognition and scale are meaningful only when they increase our ability to create responsible value for healthcare.</p>
        <p>CustoNexus was not founded because the world needed another technology company. It was founded because healthcare deserves partners who understand that every product, platform and decision ultimately affects people.</p>
        <p>We exist to improve healthcare experiences by connecting organisations and professionals with thoughtful technology, dependable medical solutions, capable expertise and trusted relationships. These are the means through which we fulfil our purpose; they are not the purpose itself.</p>
        <p>Our mission is to turn purpose into daily action: to listen carefully, solve relevant problems, strengthen the professionals who deliver care and pursue outcomes that can be understood and measured.</p>
        <p>Our vision is a future in which healthcare organisations are better connected, professionals are better supported and technology quietly enables more human, reliable and accessible care.</p>
        <p>Purpose gives us a standard for opportunity. We will not pursue every project simply because it is available. We will ask whether the work is responsible, whether we can deliver it well and whether it contributes to something worth building.</p>
        <p>When choices become difficult, purpose must help us choose long-term trust over short-term gain, meaningful contribution over empty visibility and disciplined progress over growth without direction.</p>
      </ConstitutionChapter></FadeSection>

      <FadeSection><ConstitutionChapter id="people" number="02" eyebrow="Article Two" title="People at the Centre" statement="Technology is never the purpose. People are." inverted principles={["Design around real human needs and contexts.", "Respect the knowledge of healthcare professionals.", "Protect dignity, privacy and accessibility.", "Listen before proposing a solution."]} reflection="Whose experience will this affect, and have we listened carefully enough?">
        <p>Every platform, product, process and partnership ultimately touches a person. We therefore begin with the people who will use, deliver, depend upon or be affected by what we create.</p>
        <p>Healthcare professionals are not simply users in a workflow. They are skilled people operating under pressure and making decisions that carry real consequences. We respect their judgment, their time and their knowledge of the environments in which care is delivered.</p>
        <p>Patients are not data points, transactions or abstract beneficiaries. They are people whose dignity, privacy, safety and lived experience must remain central, even when our work takes place far from the point of care.</p>
        <p>We use technology to extend human capability—not to diminish judgment, compassion or connection. A solution that is sophisticated but confusing, inaccessible or burdensome has not fulfilled its purpose.</p>
        <p>Putting people first requires listening before deciding. We seek context, observe how work is truly performed and invite honest feedback from those closest to the problem.</p>
        <p>Within CustoNexus, people-first leadership means respecting contribution, encouraging growth and communicating clearly. We hold people accountable without diminishing them.</p>
        <p>Efficiency has value because it gives time and attention back to people. Innovation has value because it enables better service. The human outcome remains the measure.</p>
      </ConstitutionChapter></FadeSection>

      <FadeSection><ConstitutionChapter id="integrity" number="03" eyebrow="Article Three" title="Integrity Without Exception" statement="Trust is earned in the decisions people see—and in those they never will." principles={["Speak honestly about capabilities and limitations.", "Protect confidential information responsibly.", "Correct mistakes promptly and transparently.", "Refuse shortcuts that compromise people or standards."]} reflection="Would we be comfortable explaining this decision openly to those who trust us?">
        <p>Healthcare depends on trust. We earn that trust by being truthful, dependable and accountable, especially when doing so is difficult, inconvenient or unseen.</p>
        <p>We do not promise what we cannot responsibly deliver. We describe capabilities accurately, communicate limitations early and make the risks of a decision understandable. Confidence built on exaggeration is fragile; confidence built on truth can endure.</p>
        <p>We honour commitments. When circumstances change, we communicate rather than disappear. When outcomes fall short, we take ownership, learn and correct the course.</p>
        <p>Accountability is not the search for someone to blame. It is the willingness to accept responsibility, explain what happened and participate fully in making things right.</p>
        <p>We protect information entrusted to us. Privacy, access and security are not technical details to address after delivery. They are expressions of respect for people and organisations.</p>
        <p>We protect trust above short-term gain. No sale, deadline or opportunity justifies conduct that compromises safety, dignity, law or the standards represented by our name.</p>
        <p>Every interaction contributes to the reputation of CustoNexus. Integrity is not one value among many; it is the condition that gives every other value credibility.</p>
      </ConstitutionChapter></FadeSection>

      <FadeSection><ConstitutionChapter id="innovation" number="04" eyebrow="Article Four" title="Innovation With Purpose" statement="The best innovation is not the most impressive. It is the most useful." inverted principles={["Solve a defined problem before adding complexity.", "Build for safety, usability and long-term value.", "Learn through evidence and responsible experimentation.", "Make improvement a continuous discipline."]} reflection="Does this create practical value, or merely appear innovative?">
        <p>We welcome bold ideas, but novelty alone is not progress. Innovation must answer a real need, work in the environment for which it was designed and create an experience people can trust.</p>
        <p>We begin with understanding. Before we design, build or recommend, we seek to know what problem exists, who experiences it, what has already been tried and what constraints shape the possible solution.</p>
        <p>We favour clear, resilient solutions over unnecessary complexity. The answer may be a platform, a better process, a dependable product, a thoughtful integration or simply clearer communication.</p>
        <p>We learn continuously because healthcare, technology and human expectations never stand still. Learning is a professional responsibility that enables us to serve with greater wisdom and confidence.</p>
        <p>We test assumptions, welcome evidence and treat useful feedback as a contribution rather than a threat. A mistake examined honestly can become learning; a mistake hidden becomes risk.</p>
        <p>We choose courage over convenience when improvement requires us to question familiar methods. Courage, however, is never permission to experiment recklessly with people&apos;s trust or wellbeing.</p>
        <p>Innovation remains accountable to safety, usability, accessibility and long-term value. The best solution continues to help after the excitement of launch has passed.</p>
      </ConstitutionChapter></FadeSection>

      <FadeSection><ConstitutionChapter id="partnership" number="05" eyebrow="Article Five" title="Partnership Over Transaction" statement="Enduring progress is built with people, not simply delivered to them." principles={["Create value for every responsible participant.", "Communicate expectations and responsibilities clearly.", "Collaborate with humility and professional respect.", "Prefer long-term trust over short-term advantage."]} reflection="Are we building a relationship that remains valuable after the immediate work is complete?">
        <p>No organisation improves healthcare alone. Meaningful progress depends on capable people and institutions working toward a shared outcome.</p>
        <p>Transactions exchange value for a moment. Partnerships can create value repeatedly over time. We seek to understand not only what a stakeholder requests, but what success means within their wider responsibilities.</p>
        <p>We approach clients, suppliers, professionals and technology partners with respect and clarity. We listen, share responsibility and establish expectations that everyone can understand.</p>
        <p>Partnership does not mean avoiding difficult conversations. Strong relationships make room for honesty, constructive disagreement and accountability.</p>
        <p>We communicate with clarity and respect because the quality of our communication shapes the quality of our relationships. Silence, ambiguity and assumption weaken trust.</p>
        <p>We recognise the contributions of others. Progress is built through many acts of preparation, judgment, care and follow-through, including work that may never be publicly visible.</p>
        <p>We want organisations to become more capable, professionals more confident and healthcare ecosystems more connected because we participated.</p>
      </ConstitutionChapter></FadeSection>

      <FadeSection><ConstitutionChapter id="stewardship" number="06" eyebrow="Article Six" title="Excellence as Stewardship" statement="To be entrusted with healthcare work is to accept a duty of care." inverted principles={["Prepare thoroughly and deliver with discipline.", "Use resources responsibly and sustainably.", "Maintain quality beyond the point of delivery.", "Leave systems and relationships stronger than we found them."]} reflection="Does the quality of this work honour the responsibility entrusted to us?">
        <p>Excellence is not perfectionism, status or appearance. It is disciplined care: understanding the requirement, preparing thoroughly, doing the work well, communicating clearly and remaining accountable for the outcome.</p>
        <p>Quality is created through daily choices. It is present in the detail we verify, the question we ask before assuming, the promise we keep and the problem we address before it becomes someone else&apos;s burden.</p>
        <p>We are stewards of resources, relationships, information and opportunity. What we hold has been entrusted to us for a time. We must use it responsibly, strengthen it where possible and prepare it for those who will follow.</p>
        <p>Leadership is stewardship in action. It is not measured by title or recognition, but by the responsibility a person carries and by the capability they develop in others.</p>
        <p>We develop people rather than creating dependence. We provide context, set clear expectations, encourage ownership and create opportunities for people to grow in confidence and judgment.</p>
        <p>We think beyond the point of delivery. A solution should be maintainable. A handover should leave knowledge behind. A partnership should create capability rather than confusion.</p>
        <p>Our standard is simple: leave the work, the relationship and the environment stronger than we found them.</p>
      </ConstitutionChapter></FadeSection>

      <FadeSection><ConstitutionChapter id="continuity" number="07" eyebrow="Article Seven" title="Carry the Responsibility Forward" statement="Principles endure only when each generation chooses to live them." principles={["Protect purpose while allowing methods to evolve.", "Develop people who can lead with judgment and courage.", "Document learning and share knowledge generously.", "Leave a foundation stronger than the one inherited."]} reflection="What are we building today that future generations will be proud to carry forward?">
        <p>Markets, technologies and leadership will change. CustoNexus must have the courage to evolve with them. Yet adaptation must never become an excuse to abandon what makes the organisation worthy of trust.</p>
        <p>We are building for generations we may never meet. That asks us to look beyond immediate recognition and consider what our choices add to the foundation others will inherit.</p>
        <p>Culture is not owned by one generation. It is entrusted to every generation. It is strengthened whenever people act with integrity, communicate respectfully, pursue excellent work and put shared purpose above personal convenience.</p>
        <p>This Constitution belongs to no single leader. Leadership must protect it, employees must animate it through daily action and partners should experience its principles in the way we work.</p>
        <p>Carrying the responsibility forward does not mean resisting change. Future leaders will face circumstances the founders could not predict. They will require judgment, courage and freedom to improve what has been built.</p>
        <p>We ask them to preserve what must never become negotiable: purpose, people, integrity, trust and the responsibility to make a meaningful contribution to healthcare.</p>
        <p>Our greatest measure of success will not be that CustoNexus existed, but that healthcare professionals, organisations, patients and communities were better because we were here.</p>
      </ConstitutionChapter></FadeSection>

      <FadeSection>
        <section className="bg-white py-20 sm:py-28"><Container><div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-950 via-[#0a327d] to-blue-700 p-8 text-white shadow-[0_30px_90px_rgba(7,26,61,.22)] sm:p-14 lg:p-20">
          <ShieldCheck size={38} className="text-emerald-400" aria-hidden /><p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-blue-200">The final declaration</p><h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-6xl">We know why we are here.</h2>
          <div className="mt-10 grid gap-8 border-t border-white/15 pt-10 text-lg leading-8 text-blue-100 md:grid-cols-2"><p>We are here to strengthen healthcare through purposeful technology, dependable solutions and meaningful human connection.</p><p>We will lead with integrity, serve with care, learn with humility and build with the future in mind.</p></div>
          <p className="mt-12 max-w-3xl text-2xl font-semibold leading-10">Together, we accept the responsibility to make healthcare better—and to ensure CustoNexus always remembers that people are the purpose.</p>
          <div className="mt-12 flex flex-wrap items-center gap-5"><Link href="/about" className="group inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-bold text-blue-800 transition hover:-translate-y-0.5">Discover our story <ArrowRight size={18} className="transition group-hover:translate-x-1" /></Link><span className="text-sm text-blue-200">Founder&apos;s Edition · CustoNexus Technologies</span></div>
        </div></Container></section>
      </FadeSection>

      <FadeSection>
        <section className="bg-[#f7f9fc] py-20 sm:py-28">
          <Container>
            <div className="mx-auto max-w-4xl">
              <p className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-blue-700"><span className="h-px w-8 bg-emerald-500" />Founder&apos;s Commitment<span className="h-px w-8 bg-emerald-500" /></p>
              <h2 className="mt-6 text-center text-4xl font-semibold tracking-[-0.04em] text-blue-950 sm:text-5xl">A promise to the future.</h2>
              <div className="mt-12 space-y-6 rounded-[2rem] border border-blue-100 bg-white p-7 text-lg leading-9 text-slate-600 shadow-[0_24px_70px_rgba(15,48,105,.09)] sm:p-12">
                <p>I founded CustoNexus Technologies with the belief that technology should serve people, not the other way around.</p>
                <p>I believe healthcare deserves partners who understand its responsibility, respect the people within it and remain committed to making it better.</p>
                <p>This Constitution represents the principles upon which I want CustoNexus Technologies to be built. No document can guarantee the future. People will ultimately determine what this organisation becomes.</p>
                <p>My responsibility as founder is therefore not simply to build a company, but to establish a foundation strong enough for others to build upon.</p>
                <p>I commit to protecting the purpose of CustoNexus Technologies, leading with integrity, remaining open to learning and placing people at the centre of our decisions.</p>
                <p>I commit to remembering why we began, protecting the trust placed in us and building an organisation worthy of being carried forward by generations I may never meet.</p>
                <div className="border-l-2 border-blue-600 pl-6 text-2xl font-semibold leading-10 text-blue-950"><p>May CustoNexus Technologies always remember:</p><p className="mt-2">Technology is never the purpose. People are.</p></div>
                <div className="flex items-end justify-between gap-6 border-t border-slate-200 pt-8"><div><p className="font-bold text-blue-950">Founder&apos;s Edition</p><p className="mt-1 text-sm text-slate-500">CustoNexus Technologies</p></div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Together, Better Healthcare.</p></div>
              </div>

              <div className="mt-8 grid items-center gap-6 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_18px_55px_rgba(15,48,105,.07)] sm:grid-cols-[176px_1fr] sm:p-7">
                <div className="relative mx-auto aspect-[4/5] w-40 overflow-hidden rounded-2xl bg-slate-100 sm:mx-0 sm:w-44">
                  <Image
                    src="/images/Founder.png"
                    alt="Founder of CustoNexus Technologies"
                    fill
                    loading="eager"
                    sizes="176px"
                    className="object-cover object-[center_32%]"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-700">Founder</p>
                  <h3 className="mt-3 text-2xl font-semibold text-blue-950">Founder of CustoNexus Technologies</h3>
                  <p className="mt-2 text-slate-600">Founded in South Africa in 2026.</p>
                  <div className="mt-5 flex flex-col gap-3 text-sm font-semibold text-slate-700 sm:flex-row sm:flex-wrap">
                    <a href="mailto:info@custonexus.com" className="inline-flex items-center justify-center gap-2 transition hover:text-blue-700 sm:justify-start"><Mail size={17} className="text-blue-700" />info@custonexus.com</a>
                    <a href="tel:+27722701087" className="inline-flex items-center justify-center gap-2 transition hover:text-blue-700 sm:justify-start"><Phone size={17} className="text-blue-700" />072 270 1087</a>
                    <a href="https://wa.me/27722701087?text=Hello%20CustoNexus%2C%20I%20would%20like%20to%20connect%20with%20the%20founder." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 transition hover:text-emerald-700 sm:justify-start"><MessageCircle size={17} className="text-emerald-600" />WhatsApp</a>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </FadeSection>
    </PageWrapper>
  );
}
