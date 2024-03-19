"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  DocumentTextIcon,
  PlusIcon,
  ChartPieIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { Button } from "./ui/button";

export function Navbar() {
  const pathname = usePathname();

  const isNotSelected = (link: string) => {
    return pathname !== link;
  };

  return (
    <div className="fixed bottom-0 flex h-16 w-full items-center justify-evenly bg-slate-800">
      <Link href="/">
        <HomeIcon className={`h-6 ${isNotSelected("/") ? "opacity-40" : ""}`} />
      </Link>
      <Link href="/expenses">
        <DocumentTextIcon
          className={`h-6 ${isNotSelected("/settings") && "opacity-40"}`}
        />
      </Link>
      <Link href="/add-expense">
        <Button size="sm" className="bg-white">
          <PlusIcon className={`h-6 text-black`} />
        </Button>
      </Link>
      <Link href="/analysis">
        <ChartPieIcon
          className={`h-6 ${isNotSelected("/settings") && "opacity-40"}`}
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
