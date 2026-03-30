"use server";

import { post, get } from "../../common/util/fetch";

export const CreateProduct = async (data: FormData) => {
  const price = Number(data.get("price"));
  const name = String(data.get("name"));
  const description = String(data.get("description"));
  return await post("products", { name, description, price });
};

export const getProducts = async () => {
  return await get("products");
};
