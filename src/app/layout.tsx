import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import cn from "@/lib/utils";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import MobileMenu from "@/components/MobileMenu";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={cn("bg-white text-slate-900 antialiased", inter.className)}
    >
      <body className="min-h-screen bg-slate-50 dark:bg-slate-900 antialiased">
        <Providers>
          {/* @ts-expect-error next 13 error */}
          <Navbar />
          <MobileMenu />
          <main>{children}</main>
        </Providers>
        {/* Allow more height for mobile menu on mobile */}
        <div className="h-40 md:hidden" />
      </body>
    </html>
  );
}
