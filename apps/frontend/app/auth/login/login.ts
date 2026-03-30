"use server";
import { API_URL } from "@/app/common/constants/api";
import { FormResponse } from "@/app/common/interface/form-response.interface";
import { getErrorMessage } from "@/app/common/util/errors";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function login(_prevState: FormResponse, data: FormData) {
  const body = data instanceof FormData ? Object.fromEntries(data) : data;
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const resData = await response.json();
  if (!response.ok) {
    return { error: getErrorMessage(resData.message) };
  }

  await setCookie(response);

  redirect("/");
}

const setCookie = async (response: Response) => {
  const setCookieHeader = response.headers.get("Set-Cookie");
  if (setCookieHeader) {
    const token = setCookieHeader.split(";")[0].split("=")[1];
    const decoded = jwtDecode<{ exp: number }>(token);
    (await cookies()).set({
      name: "Authentication",
      value: token,
      httpOnly: true,
      secure: true,
      expires: new Date(decoded.exp! * 1000),
    });
  }
};
