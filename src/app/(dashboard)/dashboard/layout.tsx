import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  // offset navbar height
  return <section className="pt-20">{children}</section>;
}
