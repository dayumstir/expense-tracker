import { Dispatch, SetStateAction, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Button } from "~/components/ui/button";
import { PlusIcon, BackspaceIcon } from "@heroicons/react/24/solid";
import { NumberPad } from "./NumberPad";

export function ExpenseDrawer() {
  const [amount, setAmount] = useState("0");

  const handleKeypadPress = (num: string) => {
    if (amount.length > 7) {
      return;
    }
    if (num === "." && amount.includes(".")) {
      return;
    }
    // Check if there are 2 or more digits after decimal place
    const regex = /\.\d{2}\b/;
    if (amount.includes(".") && regex.test(amount)) {
      return;
    }

    if (amount === "0") {
      setAmount(num);
    } else {
      setAmount((amt) => amt + num);
    }
  };

  const handleBackspace = () => {
    if (amount.length === 1) {
      setAmount("0");
    } else {
      setAmount((amt) => amt.slice(0, -1));
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="sm" className="bg-white">
          <PlusIcon className="h-6 text-black" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>New Expense</DrawerTitle>
          </DrawerHeader>
          <div className="flex items-center justify-center py-6 text-5xl font-bold">
            {amount}
            <Button variant="ghost" size="icon" className="absolute right-9">
              <BackspaceIcon
                className="h-6 opacity-40"
                onClick={() => handleBackspace()}
              />
            </Button>
          </div>
          <NumberPad handleKeypadPress={handleKeypadPress} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
