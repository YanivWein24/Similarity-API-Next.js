import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Similarity API | 404",
  description: "Free & open-source text similarity API",
};

const page = () => {
  return (
    <section className="container pt-32 max-w-7xl mx-auto text-center flex flex-col gap-6 items-center">
      <h1 className="text-black dark:text-white text-center lg:text-left font-extrabold tracking-tighter text-4xl md:text-5xl lg:text-6xl">
        Page not found...
      </h1>
      <p className="max-w-prose text-slate-700 dark:text-slate-300 mb-2 text-center text-base sm:text-lg">
        The page you&apos;re searching for does not exist.
      </p>
      <Link href="/">
        <Button variant="ghost">
          <ChevronLeft className="w-5 h-5" />
          Back to home
        </Button>
      </Link>
    </section>
  );
};

export default page;
