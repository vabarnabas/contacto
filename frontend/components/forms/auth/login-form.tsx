"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Login, loginSchema } from "@/types/auth.dto";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AUTH_LOGIN_TOAST_MESSAGES } from "@/data/toast-messages";
import { login } from "@/lib/actions/auth";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function LoginForm() {
  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    toast.promise(login(data), AUTH_LOGIN_TOAST_MESSAGES);
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="space-y-4 min-w-80">
        <p className="text-3xl font-bold mb-4">Sign in</p>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Your Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full">Sign in</Button>
      </form>
    </FormProvider>
  );
}
