import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/logos/logo-full-horizontal.png"
        alt="CustoNexus Technologies"
        width={420}
        height={84}
        priority
        className="h-14 w-auto lg:h-16"
      />
    </Link>
  );
}