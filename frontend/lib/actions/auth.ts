"use server";

import { Login } from "@/types/auth.dto";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleWrongToken() {
  cookies().delete("access_token");
  redirect("/auth/login");
}

export async function getCurrentUser(token: string) {
  const currentUserResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/current`,
    {
      next: { tags: ["/auth/current"], revalidate: 120 },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const currentUser = await currentUserResponse.json();

  if (!currentUser) {
    throw new Error("No User Found");
  }

  return currentUser;
}

export async function login(dto: Login) {
  const loginResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    }
  );

  if (!loginResponse.ok) {
    throw new Error("Login Failed");
  }

  const accessToken = await loginResponse.json();

  if (!accessToken) {
    throw new Error("No Access Token Found");
  }

  await cookies().set("access_token", accessToken.token, {});

  await getCurrentUser(accessToken.token);

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
