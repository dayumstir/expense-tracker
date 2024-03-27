"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { ExpenseEditForm } from "./ExpenseEditForm";

type Expense = {
  id: string;
  amount: number;
  title: string;
  date: Date;
  category: string;
  userId: string;
};

export default function ExpenseRow({ expense }: { expense: Expense }) {
  const [open, setOpen] = useState(false);

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="mb-2 flex w-full justify-between px-4 py-2">
          <div className="flex flex-col gap-0.5">
            <h2 className="">{expense.title}</h2>
            <p className="text-xs text-muted-foreground">{expense.category}</p>
          </div>

          <p className="my-auto font-semibold">-${expense.amount.toString()}</p>
        </div>
      </DrawerTrigger>
      <DrawerContent className="px-4 pb-safe-or-4">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-xl text-primary">
              Edit Expense
            </DrawerTitle>
          </DrawerHeader>
          <ExpenseEditForm closeDrawer={closeDrawer} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
