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
        priority
        className="h-auto w-[190px] max-w-full sm:h-14 sm:w-auto lg:h-16"
      />
    </Link>
  );
}
