type SocialProfile = {
  name: string;
  handle: string;
  href: string;
  icon: "facebook" | "instagram" | "linkedin";
};

const socialProfiles: SocialProfile[] = [
  {
    name: "LinkedIn",
    handle: "LinkedIn",
    href: "https://www.linkedin.com/company/custonexus-technologies/about/",
    icon: "linkedin",
  },
  {
    name: "Facebook",
    handle: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61593696335289",
    icon: "facebook",
  },
  {
    name: "Instagram",
    handle: "@custonexus",
    href: "https://www.instagram.com/custonexus/",
    icon: "instagram",
  },
];

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M5.2 3.5A2.2 2.2 0 1 1 5.2 8a2.2 2.2 0 0 1 0-4.5ZM3.3 9.6h3.8v11.1H3.3V9.6Zm6.1 0h3.7v1.5h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.8 2.6 4.8 6.1v5.4h-3.8v-4.8c0-1.1 0-3.2-2-3.2s-2.3 1.5-2.3 3.1v4.9H9.8V9.6h-.4Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor" aria-hidden="true">
      <path d="M14.3 8.2V6.5c0-.8.5-1 1-1h2.6V2.1L14.8 2c-3.5 0-4.3 2.1-4.3 4.1v2.1H8v3.9h2.5V22h3.8v-9.9h3.2l.5-3.9h-3.7Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="18" height="18" x="3" y="3" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SocialIcon({ icon }: { icon: SocialProfile["icon"] }) {
  if (icon === "linkedin") return <LinkedInIcon />;
  if (icon === "facebook") return <FacebookIcon />;
  return <InstagramIcon />;
}

export default function SocialLinks() {
  return (
    <div aria-label="CustoNexus social media">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-300">
        Follow CustoNexus
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {socialProfiles.map((profile) => (
          <a
            key={profile.name}
            href={profile.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow CustoNexus Technologies on ${profile.name}`}
            title={`CustoNexus Technologies on ${profile.name}`}
            className="group inline-flex min-h-11 items-center gap-3 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2.5 text-sm font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300/60 hover:bg-white/15 hover:text-white focus-visible:border-blue-300 focus-visible:bg-white/15"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-700 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <SocialIcon icon={profile.icon} />
            </span>
            <span>{profile.handle}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
