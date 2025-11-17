import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const NavDesktop = () => {
  const t = useTranslations("Navbar");

  return (
    <div className="hidden md:flex space-x-6">
      <Link href={"/"}>{t("home")}</Link>
      <Link href={"/products"} className="hover:text-blue-600">
        {t("products")}
      </Link>
      <Link href={"/checkout"} className="hover:text-blue-600">
        {t("checkout")}
      </Link>
    </div>
  );
};

export default NavDesktop;
