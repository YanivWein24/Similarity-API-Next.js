"use client";

import { ButtonHTMLAttributes } from "react";
import { Copy } from "lucide-react";
import Button from "./Button";
import { toast } from "./Toast";

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  valueToCopy: string;
}

export default function CopyButton({
  valueToCopy,
  className,
  ...props
}: CopyButtonProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(valueToCopy);
    toast({
      title: "Copied",
      message: "API key copied to clipboard",
      type: "success",
    });
  };

  return (
    <Button
      {...props}
      variant="ghost"
      className={className}
      onClick={copyToClipboard}
    >
      <Copy className="w-5 h-5" />
    </Button>
  );
}
