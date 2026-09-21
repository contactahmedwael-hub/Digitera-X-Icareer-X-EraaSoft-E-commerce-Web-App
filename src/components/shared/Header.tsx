import Link from "next/link";
import { CartNavLink } from "@/features/cart";
import { productPaths } from "@/features/products";

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6 md:px-10 lg:px-20">
        <Link href={productPaths.list} className="text-lg font-semibold">
          Storefront
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href={productPaths.list} className="hover:text-zinc-600">
            Products
          </Link>
          <CartNavLink />
        </nav>
      </div>
    </header>
  );
}
