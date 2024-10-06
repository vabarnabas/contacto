import CreateApiKeyModal from "@/components/modals/application/create-api-key-modal";
import ApplicationTabs from "@/components/tabs/application/application-tabs";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Application } from "@/types/application.dto";
import { KeyRound } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function ApplicationPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const applicationResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/applications/${id}`,
    {
      cache: "no-cache",
    }
  );

  if (!applicationResponse.ok) {
    throw new Error("Failed to fetch applications");
  }

  const application: Application = await applicationResponse.json();

  return (
    <Tabs defaultValue="responses">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold mb-4">{application.name}</p>
        <Link
          href={"/"}
          className={cn(buttonVariants({ variant: "destructive", size: "sm" }))}
        >
          Terminate App
        </Link>
      </div>
      <ApplicationTabs />
      <TabsContent className="mt-4" value="responses">
        <p className="text-2xl font-bold mb-2">Responses</p>
      </TabsContent>
      <TabsContent className="mt-4 space-y-4" value="settings">
        <p className="text-2xl font-bold -mb-2">Settings</p>
        <div className="">
          <Label>Application ID</Label>
          <p className="bg-secondary px-2 py-1 rounded-md mt-2 select-all">
            {application.id}
          </p>
        </div>
        <div className="">
          <Label>API Keys</Label>
          {application.apiKeys.length ? (
            <div className="mt-2 space-y-2">
              {application.apiKeys.map((apiKey) => (
                <div
                  key={apiKey.id}
                  className="border rounded-lg pl-4 pr-3 py-2"
                >
                  <p className="font-medium flex items-center gap-x-1.5">
                    <KeyRound className="text-primary size-4" />
                    {apiKey.name}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
          <div className="mt-2">
            <CreateApiKeyModal applicationId={id} />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
