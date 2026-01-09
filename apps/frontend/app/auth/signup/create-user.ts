"use server";

import { API_URL } from "@/app/constants/api";
import { redirect } from "next/navigation";

export default async function createUser(
  _prevState: unknown,
  formData: FormData
) {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    body: formData,
  });

  const resData = await response.json();
  console.log("Response:", resData);

  if (!resData.ok) {
    return { error: resData.message || "Something went wrong" };
  }

  redirect("/");
}
