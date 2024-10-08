"use server";

import { CreateApiKey, CreateApplication } from "@/types/application.dto";
import { revalidatePath } from "next/cache";
import { getCurrentUser, handleWrongToken } from "./auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createApplication(dto: CreateApplication) {
  const token = cookies().get("access_token");

  if (!token || !token.value) {
    return handleWrongToken();
  }

  const currentUser = await getCurrentUser(token.value);

  const createApplicationResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/applications`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...dto,
        userId: currentUser.id,
      }),
    }
  );

  if (!createApplicationResponse.ok) {
    throw new Error("Create Application Failed");
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function createApiKey(dto: CreateApiKey) {
  const token = cookies().get("access_token");

  if (!token || !token.value) {
    return handleWrongToken();
  }

  const createApiKeyResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/applications/api-keys`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    }
  );

  if (!createApiKeyResponse.ok) {
    throw new Error("Create API Key Failed");
  }

  revalidatePath(`/dashboard/applications/${dto.applicationId}`);
}
