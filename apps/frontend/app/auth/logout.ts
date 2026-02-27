"use server";
import { cookies } from "next/headers";
import { AUTHENTICATION_COOKIE_NAME } from "../common/constants/auth-cookie";
import { redirect } from "next/navigation";

export default async function Logout() {
  await (await cookies()).delete(AUTHENTICATION_COOKIE_NAME);
  redirect("/auth/login");
}
