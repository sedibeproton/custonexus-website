import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
}

export default function FadeIn({ children }: Props) {
  return <div>{children}</div>;
}
