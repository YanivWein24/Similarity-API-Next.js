import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { notFound } from "next/navigation";
import ApiDashboard from "@/components/ApiDashboard";
import RequestApiKey from "@/components/RequestApiKey";
import db from "../../../../prisma/db";

export const metadata: Metadata = {
  title: "Similarity API | Dashboard",
  description: "Free & open-source text similarity API",
};

export default async function page() {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();

  const apiKey = await db.apiKey.findFirst({
    where: {
      userId: user.user.id,
      enabled: true, // only if the key is enabled
    },
  });

  return (
    <div className="max-w-7xl mx-auto mt-16">
      {apiKey ? (
        // @ts-expect-error server component (next 13 temp issue)
        <ApiDashboard />
      ) : (
        <RequestApiKey />
      )}
    </div>
  );
}
