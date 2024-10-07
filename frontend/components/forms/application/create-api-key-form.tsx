"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createApiKey } from "@/lib/actions/application";
import { CreateApiKey, createApiKeySchema } from "@/types/application.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateApiKeyForm({
  applicationId,
  setIsOpen,
}: {
  applicationId: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<CreateApiKey>({
    defaultValues: { applicationId },
    resolver: zodResolver(createApiKeySchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    toast.promise(createApiKey(data));
    setIsOpen(false);
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="API Key Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full">Create</Button>
      </form>
    </FormProvider>
  );
}
