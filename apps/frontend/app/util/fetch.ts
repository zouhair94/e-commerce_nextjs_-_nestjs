import { API_URL } from "@/app/constants/api";
import { getErrorMessage } from "@/app/util/errors";

export const post = async (path: string, data: FormData | object) => {
  const body = data instanceof FormData ? Object.fromEntries(data) : data;
  console.log("POST Request Body:", body);
  const response = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const resData = await response.json();
  console.log("POST Response Data:", resData);

  if (!resData.ok) {
    return { error: getErrorMessage(resData.message) };
  }

  return { error: null, data: resData.data };
};
