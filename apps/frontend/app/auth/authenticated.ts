"use server";

import { cookies } from "next/headers";
import { AUTHENTICATION_COOKIE_NAME } from "../common/constants/auth-cookie";

export default async function Authenticated() {
  return !!(await cookies()).get(AUTHENTICATION_COOKIE_NAME)?.value;
}
