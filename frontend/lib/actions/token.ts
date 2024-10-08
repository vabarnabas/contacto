"use server";
import { cookies } from "next/headers";
import { handleWrongToken } from "./auth";

export async function getToken() {
  const token = cookies().get("access_token");

  if (!token || !token.value) {
    return handleWrongToken();
  }

  return token.value;
}
