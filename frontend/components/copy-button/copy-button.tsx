"use client";
import React from "react";
import { Button } from "../ui/button";
import { Copy } from "lucide-react";
import copy from "copy-to-clipboard";
import { toast } from "sonner";

export default function CopyButton({ content }: { content: string }) {
  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => {
        copy(content);
        toast.success("API Key Copied to Clipboard");
      }}
    >
      <Copy className="size-4" />
    </Button>
  );
}
