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
      <main>{children}</main>
      <Footer />
    </>
  );
}