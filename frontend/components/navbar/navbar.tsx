import { cn } from "@/lib/utils";
import { Mailbox } from "lucide-react";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";

export default function Navbar() {
  return (
    <div className="fixed inset-x-0 h-16 flex items-center justify-center bg-background">
      <div className="w-full max-w-[1280px] flex items-center justify-between px-6">
        <p className="text-2xl font-bold flex items-center gap-x-1">
          <Mailbox className="size-7 text-primary" />
          Contacto
        </p>
        <Link
          className={cn(buttonVariants({ variant: "default" }))}
          href="/dashboard"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
