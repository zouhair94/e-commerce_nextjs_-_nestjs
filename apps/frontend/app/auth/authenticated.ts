"use server";

import { cookies } from "next/headers";

export default async function Authenticated() {
  return !!(await cookies()).get("Authentication")?.value;
}
