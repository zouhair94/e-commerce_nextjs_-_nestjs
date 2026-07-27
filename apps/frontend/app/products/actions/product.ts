"use server";

import { revalidatePath } from "next/cache";
import { post, get, getHeaders } from "../../common/util/fetch";
import { API_URL } from "@/app/common/constants/api";

export const CreateProduct = async (data: FormData) => {
  const price = Number(data.get("price"));
  const name = String(data.get("name"));
  const description = String(data.get("description"));
  const image = data.get("image") as File | null;
  const response = await post("products", { name, description, price });
  if (image && response.data?.id) {
    await UploadProductImage(response.data.id, image);
  }
  revalidatePath("/products");
  return response;
};

export const UploadProductImage = async (productId: string, file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  try {
    await fetch(`${API_URL}/products/${productId}/image`, {
      method: "POST",
      headers: {
        ...(await getHeaders()),
      },
      body: formData,
    });
  } catch (error) {
    console.error("Error uploading product image:", error);
  }
};

export const getProducts = async () => {
  return await get("products");
};
