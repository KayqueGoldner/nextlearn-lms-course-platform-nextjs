"use client";

import Image from "next/image";
import Link from "next/link";

import Logo from "@/public/logo.svg";
import { ThemeToggle } from "@/components/sidebar/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";

import UserDropdown from "./user-dropdown";

const NAVIGATION_ITEMS = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Courses",
    href: "/courses",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
];

export const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="bg-background/95 backdrop-blur-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto flex min-h-16 items-center px-4 md:px-6 lg:px-8">
        <Link href="/" className="mr-4 flex items-center gap-2">
          <Image src={Logo} alt="logo" className="size-9" />
          <span className="font-bold">NextLearn.</span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <div className="flex items-center gap-x-2">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:text-primary text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            {!isPending && session ? (
              <UserDropdown
                email={session.user.email}
                name={session.user.name}
                image={session.user.image || ""}
              />
            ) : (
              <>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "secondary" })}
                >
                  Login
                </Link>
                <Link href="/login" className={buttonVariants()}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
