import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface Props {
  children: ReactNode;
}

export default function PageWrapper({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-clip">{children}</main>
      <Footer />
    </>
  );
}
