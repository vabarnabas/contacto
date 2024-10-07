"use client";
import CreateApiKeyForm from "@/components/forms/application/create-api-key-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

export default function CreateApiKeyModal({
  applicationId,
}: {
  applicationId: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Create API Key</Button>
      </DialogTrigger>
      <DialogContent className="gap-2">
        <DialogHeader>
          <DialogTitle>Create API Key</DialogTitle>
          <DialogDescription>
            Create an API Key to use your application with the API.
          </DialogDescription>
        </DialogHeader>
        <CreateApiKeyForm applicationId={applicationId} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
