import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Button } from "~/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/solid";
import { ExpenseForm } from "./ExpenseForm";
import { useState } from "react";

export function ExpenseDrawer() {
  const [open, setOpen] = useState(false);

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="sm" className="bg-white hover:bg-white">
          <PlusIcon className="h-6 text-black" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-4 pb-4">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-xl text-primary">
              New Expense
            </DrawerTitle>
          </DrawerHeader>
          <ExpenseForm closeDrawer={closeDrawer} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
