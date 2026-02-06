import { API_URL } from "@/app/common/constants/api";
import { getErrorMessage } from "@/app/common/util/errors";
import { cookies } from "next/headers";

export const getHeaders = async () => ({
  Cookie: (await cookies()).toString(),
});

export const post = async (path: string, data: FormData | object) => {
  const body = data instanceof FormData ? Object.fromEntries(data) : data;
  const response = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(await getHeaders()),
    },
    body: JSON.stringify(body),
  });

  const resData = await response.json();

  if (!response.ok) {
    return { error: getErrorMessage(resData.message) };
  }

  return { error: null, data: resData };
};

export const get = async (path: string) => {
  const cookie = await getHeaders();
  const response = await fetch(`${API_URL}/${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...cookie,
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    return { error: getErrorMessage(resData.message) };
  }

  return { error: null, data: resData };
};
