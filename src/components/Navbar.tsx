import { getServerSession } from "next-auth";
import Link from "next/link";
import authOptions from "@/lib/auth";
import { buttonVariants } from "./ui/Button";
import SignInButton from "./ui/SignInButton";
import SignOutButton from "./ui/SignOutButton";
import ThemeToggle from "./ThemeToggle";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className={buttonVariants({ variant: "link" })}>
          Text Similarity API
        </Link>

        {/* theme menu mobile */}
        <div className="md:hidden">
          <ThemeToggle />
        </div>

        {/* theme menu larger screens */}
        <div className="hidden md:flex gap-4">
          <ThemeToggle />
          <Link
            href="/documentation"
            className={buttonVariants({ variant: "ghost" })}
          >
            Documentation
          </Link>

          {session ? (
            <>
              <Link
                href="/dashboard"
                className={buttonVariants({ variant: "ghost" })}
              >
                Dashboard
              </Link>
              <SignOutButton />
            </>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </div>
  );
}
