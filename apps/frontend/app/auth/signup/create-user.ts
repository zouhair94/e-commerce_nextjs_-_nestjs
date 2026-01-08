"use server";

import { API_URL } from "@/app/constants/api";
import { redirect } from "next/navigation";

export default async function createUser(
  _prevState: unknown,
  formData: FormData
) {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formData,
  });

  const resData = await response.json();
  if (!resData.ok) {
    return { error: "Failed to create user" };
  }

  redirect("/");
}
