"use server";

import { post } from "../common/util/fetch";

export const CreateProduct = async (data: FormData) => {
  const price = Number(data.get("price"));
  const name = String(data.get("name"));
  const description = String(data.get("description"));
  return await post("products", { name, description, price });
};
