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
    <div className="fixed bottom-0 flex h-16 w-full items-center justify-evenly bg-slate-800">
      <Link href="/">
        <HomeIcon className={`h-6 ${isNotSelected("/") ? "opacity-40" : ""}`} />
      </Link>
      <Link href="/expenses">
        <DocumentTextIcon
          className={`h-6 ${isNotSelected("/expenses") && "opacity-40"}`}
        />
      </Link>
      <ExpenseDrawer />
      <Link href="/analytics">
        <ChartPieIcon
          className={`h-6 ${isNotSelected("/analytics") && "opacity-40"}`}
        />
      </Link>
      <Link href="/settings">
        <Cog6ToothIcon
          className={`h-6 ${isNotSelected("/settings") && "opacity-40"}`}
        />
      </Link>
    </div>
  );
}
