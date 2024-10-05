import { Application } from "@/types/application.dto";
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
    <div>
      <p className="text-2xl font-bold">{application.name}</p>
    </div>
  );
}
