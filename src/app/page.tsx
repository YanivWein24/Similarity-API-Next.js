import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`bg-red-500 ${inter.className} `}>
      <h1 className="text-blue-500 text-3xl pt-5">Check</h1>
      <h1 className="text-blue-500 text-3xl pt-5">Check</h1>
    </main>
  );
}
