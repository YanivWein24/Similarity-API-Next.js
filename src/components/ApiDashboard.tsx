import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { formatDistance } from "date-fns";
import db from "../../prisma/db";
import LargeHeading from "./ui/LargeHeading";
import Paragraph from "./ui/Paragraph";
import Input from "./ui/Input";
import Table from "./Table";
import ApiKeyOptions from "./ApiKeyOptions";

export default async function ApiDashboard() {
  const user = await getServerSession();
  if (!user) return notFound();

  const apiKeys = await db.apiKey.findMany({
    where: {
      userId: user.user.id,
    },
  });

  const activeKey = apiKeys.find((apiKey) => apiKey.enabled);
  if (!activeKey) return notFound();

  const userRequest = await db.apiRequest.findMany({
    where: {
      apiKeyId: {
        in: apiKeys.map((key) => key.id),
      },
    },
  });

  const formattedUserRequest = userRequest.map((req) => ({
    ...req,
    timestamp: formatDistance(new Date(req.timestamp), new Date(), {
      addSuffix: true,
    }),
  }));

  return (
    <div className="container flex flex-col gap-6">
      <LargeHeading>Welcome Back, {user.user.name}</LargeHeading>
      <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
        <Paragraph>Your API Key:</Paragraph>
        <Input className="w-fit truncate" readOnly value={activeKey.key} />
        {/* "truncate" - when the text is overflowing, replace the overflow part with "..." */}
        <ApiKeyOptions apiKeyId={activeKey.id} apiKeyKey={activeKey.key} />
      </div>
      <Paragraph className="text-center md:text-left my-4 -mb-4">
        Your API History:
      </Paragraph>
      <Table userRequests={formattedUserRequest} />
    </div>
  );
}
