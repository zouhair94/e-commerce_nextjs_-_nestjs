"use server";
import { post } from "../../common/util/fetch";

export default async function checkout(productId: string) {
  return await post("checkout/session", { productId });
}
