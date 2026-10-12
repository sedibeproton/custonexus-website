import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex min-w-0 items-center" aria-label="CustoNexus Technologies home">
      <Image
        src="/logos/logo-full-horizontal.png"
        alt="CustoNexus Technologies"
        width={420}
        height={84}
        loading="eager"
        sizes="(max-width: 639px) 190px, (max-width: 1023px) 280px, 320px"
        quality={70}
        className="h-auto w-[190px] max-w-full sm:h-14 sm:w-auto lg:h-16"
      />
    </Link>
  );
}
