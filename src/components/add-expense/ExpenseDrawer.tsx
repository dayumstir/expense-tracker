import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Button } from "~/components/ui/button";
import { PlusIcon, BackspaceIcon } from "@heroicons/react/24/solid";
import { ExpenseForm } from "./ExpenseForm";

export function ExpenseDrawer() {
  const resetFields = () => {
    // setAmount("0");
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          size="sm"
          className="bg-white hover:bg-white"
          onClick={() => resetFields()}
        >
          <PlusIcon className="h-6 text-black" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>New Expense</DrawerTitle>
          </DrawerHeader>
          <ExpenseForm />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
