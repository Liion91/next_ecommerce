"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Locale = () => {
  const router = useRouter();

  const [locale, setLocale] = useState<string>("");

  const changeLocale = (newLocale: string) => {
    document.cookie = `LEO_NEXT_LOCALE=${newLocale}`;
    setLocale(newLocale);
    router.refresh();
  };

  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("LEO_NEXT_LOCALE="))
      ?.split("=")[1];

    if (cookieLocale) {
      setLocale(cookieLocale);
    } else {
      // get default browser language
      const browserLocale = navigator.language.slice(0, 2);
      setLocale(browserLocale);

      // set cookie
      document.cookie = `LEO_NEXT_LOCALE=${browserLocale}`;

      router.refresh();
    }
  }, [router]);

  return (
    <>
      <Button
        onClick={() => changeLocale("en")}
        className={`border p-2 font-bold rounded-md text-sm cursor-pointer w-7 h-7 ${
          locale === "en" ? "bg-yellow-200 text-black" : "bg-white text-black"
        } hover:bg-gray-400`}
      >
        <h3>EN</h3>
      </Button>
      <Button
        onClick={() => changeLocale("it")}
        className={`border p-2 font-bold rounded-md text-sm cursor-pointer w-7 h-7 ${
          locale === "it" ? "bg-yellow-200 text-black" : "bg-white text-black"
        } hover:bg-gray-400`}
      >
        <h3>IT</h3>
      </Button>
    </>
  );
};

export default Locale;
