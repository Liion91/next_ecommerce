import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const NavMobile = () => {
  const t = useTranslations("Navbar");

  return (
    <nav className="md:hidden bg-white shadow-md border border-b-2 border-gray-200">
      <ul className="flex flex-col p-4 space-y-2">
        <li>
          <Link href={"/"} className="block hover:text-blue-600">
            {t("home")}
          </Link>
        </li>
        <li>
          <Link href={"/products"} className="block hover:text-blue-600">
            {t("products")}
          </Link>
        </li>
        <li>
          <Link href={"/checkout"} className="block hover:text-blue-600">
            {t("checkout")}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavMobile;
