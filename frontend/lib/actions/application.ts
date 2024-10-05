"use server";

import { CreateApplication } from "@/types/application.dto";
import { revalidatePath } from "next/cache";
import { getCurrentUser, handleWrongToken } from "./auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createApplication(dto: CreateApplication) {
  const token = cookies().get("access_token");

  if (!token || !token.value) {
    return handleWrongToken;
  }

  const currentUser = await getCurrentUser(token.value);

  const createApplicationRepsone = await fetch(
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

  if (!createApplicationRepsone.ok) {
    throw new Error("Create Application Failed");
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
