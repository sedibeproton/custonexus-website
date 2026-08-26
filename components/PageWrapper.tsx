import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";

interface Props {
  children: ReactNode;
}

export default function PageWrapper({ children }: Props) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 overflow-clip bg-[#f7f9fc]">{children}</main>
      <FloatingWhatsApp />
      <Footer />
    </>
  );
}
