import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import ConversionTracking from "./ConversionTracking";
import BackgroundDecor from "./BackgroundDecor";

interface Props {
  children: ReactNode;
}

export default function PageWrapper({ children }: Props) {
  return (
    <>
      <BackgroundDecor />
      <Navbar />
      <main id="main-content" className="flex-1 overflow-clip bg-[#f7f9fc]">{children}</main>
      <FloatingWhatsApp />
      <ConversionTracking />
      <Footer />
    </>
  );
}
