import LoginForm from "@/components/forms/auth/login-form";
import { Mailbox } from "lucide-react";
import React from "react";

export default function LoginPage() {
  return (
    <div className="grid md:grid-cols-2 h-screen w-full">
      <div className="w-full h-full bg-primary relative justify-center items-center hidden md:flex">
        <div className="text-primary-foreground flex flex-col justify-center items-center">
          <Mailbox className="size-52" />
          <p className="text-5xl font-bold">Contacto</p>
        </div>
      </div>
      <div className="flex justify-center items-center px-12">
        <LoginForm />
      </div>
    </div>
  );
}
