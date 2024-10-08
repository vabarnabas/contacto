import ApplicationCardDropdown from "@/components/dropdowns/application/application-card-dropdown";
import { getToken } from "@/lib/actions/token";
import { Application } from "@/types/application.dto";
import { AppWindowMac, Box } from "lucide-react";
import React from "react";

export default async function ApplicationsParralellSection() {
  const token = await getToken();

  const applicationResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/applications`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  );

  if (!applicationResponse.ok) {
    throw new Error("Failed to fetch applications");
  }

  const applications: Application[] = await applicationResponse.json();

  if (!applications.length) {
    return (
      <div className="flex flex-grow justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="size-20 rounded-full bg-primary text-primary-foreground flex justify-center items-center">
            {<Box className="size-9" />}
          </div>
          <p className="mt-3 text-2xl font-semibold">Its Lonely Here...</p>
          <p className="text-muted-foreground mt-1 max-w-80 text-center">
            It seems there are no applications. Create your first application to
            get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2">
      {applications.map((application) => (
        <div
          key={application.id}
          className="border pl-4 pr-3 py-2.5 rounded-lg"
        >
          <div className="font-semibold flex justify-between items-center">
            <div className="flex items-center gap-x-2">
              <AppWindowMac className="size-5 text-primary" />
              {application.name}
            </div>
            <ApplicationCardDropdown id={application.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
