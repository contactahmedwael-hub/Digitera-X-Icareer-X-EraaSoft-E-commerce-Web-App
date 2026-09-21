import { redirect } from "next/navigation";
import { productPaths } from "@/features/products";

export default function HomeRoute() {
  redirect(productPaths.list);
}
