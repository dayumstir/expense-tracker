"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { ExpenseEditForm } from "./ExpenseEditForm";
import { Button } from "~/components/ui/button";
import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteExpense } from "./actions";
import { Loader2 } from "lucide-react";

type Expense = {
  id: string;
  amount: number;
  title: string;
  date: Date;
  category: string;
  userId: string;
};

const DeleteButton = (props: { expenseId: string }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const confirmExpenseDelete = async () => {
    setLoading(true);
    await deleteExpense(props.expenseId);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="rounded-full opacity-80">
          <TrashIcon className="h-5 text-destructive" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-4 pb-safe-or-4">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-xl">Delete Expense?</DrawerTitle>
            <DrawerDescription>This action cannot be undone</DrawerDescription>
          </DrawerHeader>
          <Button
            variant="destructive"
            className="mb-2 w-full"
            disabled={loading}
            onClick={() => confirmExpenseDelete()}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            disabled={loading}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
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
              <span className="absolute right-4 top-8">
                <DeleteButton expenseId={expense.id} />
              </span>
            </DrawerTitle>
          </DrawerHeader>
          <ExpenseEditForm expense={expense} closeDrawer={closeDrawer} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
