"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

function Header() {
  const path = usePathname();

  useEffect(() => {
    console.log("Current Path:", path);
  }, [path]);

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      {/* Logo redirects to Dashboard */}
      <Link href="/dashboard">
        <Image src="/logo.svg" width={160} height={100} alt="logo" className="cursor-pointer" />
      </Link>

      <ul className="hidden md:flex gap-6">
        <Link href="/dashboard">
          <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === "/dashboard" && "text-primary font-bold"}`}>
            Dashboard
          </li>
        </Link>
        <Link href="/questions">
          <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === "/questions" && "text-primary font-bold"}`}>
            Questions
          </li>
        </Link>
        <Link href="/pricing">
          <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === "/pricing" && "text-primary font-bold"}`}>
            Pricing
          </li>
        </Link>
        <Link href="/how-it-works">
          <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === "/how-it-works" && "text-primary font-bold"}`}>
            How It Works?
          </li>
        </Link>
      </ul>
      
      <UserButton />
    </div>
  );
}

export default Header;
