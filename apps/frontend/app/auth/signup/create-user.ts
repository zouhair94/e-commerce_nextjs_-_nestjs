"use server";

import { API_URL } from "@/app/constants/api";
import { getErrorMessage } from "@/app/util/errors";
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

  if (!resData.ok) {
    return { error: getErrorMessage(resData.message) };
  }

  redirect("/");
}
