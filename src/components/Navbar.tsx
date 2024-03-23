"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  DocumentTextIcon,
  ChartPieIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { ExpenseDrawer } from "./add-expense/ExpenseDrawer";
import { Button } from "./ui/button";

export function Navbar() {
  const pathname = usePathname();

  const isNotSelected = (url: string) => {
    return pathname !== url;
  };

  const validPaths = ["/", "/expenses", "/analytics", "/settings"];

  if (!validPaths.includes(pathname)) {
    return;
  }

  return (
    <div className="pb-safe-or-4 fixed bottom-0 flex w-full items-center justify-evenly bg-muted p-4">
      <Button
        asChild
        variant="ghost"
        className={isNotSelected("/") ? "opacity-40" : ""}
      >
        <Link href="/">
          <HomeIcon className={"h-6 text-foreground"} />
        </Link>
      </Button>

      <Button
        asChild
        variant="ghost"
        className={isNotSelected("/expenses") ? "opacity-40" : ""}
      >
        <Link href="/expenses">
          <DocumentTextIcon className={"h-6 text-foreground"} />
        </Link>
      </Button>

      <ExpenseDrawer />

      <Button
        asChild
        variant="ghost"
        className={isNotSelected("/analytics") ? "opacity-40" : ""}
      >
        <Link href="/analytics">
          <ChartPieIcon className={"h-6 text-foreground"} />
        </Link>
      </Button>

      <Button
        asChild
        variant="ghost"
        className={isNotSelected("/settings") ? "opacity-40" : ""}
      >
        <Link href="/settings">
          <Cog6ToothIcon className={"h-6 text-foreground"} />
        </Link>
      </Button>
    </div>
  );
}
