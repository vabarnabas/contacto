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
import { createApplication } from "@/lib/actions/application";
import {
  CreateApplication,
  createApplicationSchema,
} from "@/types/application.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateApplicationForm() {
  const form = useForm<CreateApplication>({
    resolver: zodResolver(createApplicationSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    toast.promise(createApplication(data));
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="space-y-4 w-full">
        <p className="text-3xl font-bold mb-4">Create Application</p>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Application Name" {...field} />
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
