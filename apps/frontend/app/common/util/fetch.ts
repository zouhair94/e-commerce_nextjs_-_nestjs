import { API_URL } from "@/app/common/constants/api";
import { getErrorMessage } from "@/app/common/util/errors";

export const post = async (path: string, data: FormData | object) => {
  const body = data instanceof FormData ? Object.fromEntries(data) : data;
  const response = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const resData = await response.json();

  if (resData.error) {
    return { error: getErrorMessage(resData.message) };
  }

  return { error: null, data: resData.data };
};
