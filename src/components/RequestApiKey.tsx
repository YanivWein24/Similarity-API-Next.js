"use client";

import { FormEvent, useState } from "react";
import createApiKey from "@/helpers/create-api-key";
import { Key } from "lucide-react";
import { toast } from "./ui/Toast";
import LargeHeading from "./ui/LargeHeading";
import Paragraph from "./ui/Paragraph";
import CopyButton from "./ui/CopyButton";
import Input from "./ui/Input";
import Button from "./ui/Button";

export default function RequestApiKey() {
  const [isCreating, setIsCreating] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  const createNewKey = async (event: FormEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      const generatedApiKey = await createApiKey();
      setApiKey(generatedApiKey);
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: "Error",
          message: err.message,
          type: "error",
        });
        return;
      }
      toast({
        title: "Error",
        message: "Something went wrong",
        type: "error",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="container md:max-w-2xl">
      <div className="flex flex-col gap-6 items-center">
        <Key className="mx-auto h-12 w-12 text-gray-400" />
        <LargeHeading className="text-center">
          Request your API key
        </LargeHeading>
        <Paragraph>You haven&apos;t requested an API key yet.</Paragraph>
      </div>
      <form
        onSubmit={createNewKey}
        className="mt-6 sm:flex sm:items-center sm:gap-2"
        action="#"
      >
        <div className="relative rounded-md shadow-sm sm:min-w-0 sm:flex-1">
          {apiKey && (
            <CopyButton
              type="button"
              valueToCopy={apiKey}
              className="absolute top-0 left-0 right-0 animate-in fade-in duration-300"
            />
          )}
          <Input
            readOnly
            value={apiKey ?? ""}
            placeholder="Request an API key to display it here!"
          />
        </div>
        <div className="mt-6 flex justify-center sm:mt-0 sm:ml-4 sm:flex-shrink-0">
          <Button disabled={!!apiKey} isLoading={isCreating} type="submit">
            Request Key
          </Button>
        </div>
      </form>
    </div>
  );
}
