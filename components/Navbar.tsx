"use client";

import { useCartStore } from "@/store/cart-store";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
// import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Locale from "./ManageLocale";
import NavDesktop from "./NavMenu/desktop";
import NavMobile from "./NavMenu/mobile";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const { items } = useCartStore();

  // reduce cicla sull'array degli item
  // acc -> accumulatore che somma tutte le quantity degli item
  // inizia da 0
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const t = useTranslations("Navbar");

  console.log('MObileOpen ->', mobileOpen)

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href={"/"} className="hover:text-blue-600">
          My Ecommerce
        </Link>
        <NavDesktop />
        <div className="flex items-center space-x-4">
          <Link href={"/checkout"} className="relative">
            <ShoppingCartIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <Locale></Locale>
          <Button
            variant={"ghost"}
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <XMarkIcon /> : <Bars3Icon />}
          </Button>
        </div>
      </div>
      {mobileOpen && (
        <NavMobile />
      )}
    </nav>
  );
};

export default Navbar;
