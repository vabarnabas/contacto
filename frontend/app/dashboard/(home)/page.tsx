import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <p className="text-2xl font-bold">Applications</p>
        <Link
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "flex items-center gap-x-1"
          )}
          href="/dashboard/applications/editor"
        >
          <Plus className="size-4" /> Create
        </Link>
      </div>
    </div>
  );
}
