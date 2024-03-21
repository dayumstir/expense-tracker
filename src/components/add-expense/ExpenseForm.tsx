"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  BackspaceIcon,
  CalendarIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { useState } from "react";

const FormSchema = z.object({
  title: z.string().min(1),
  amount: z.coerce.number().gt(0),
  date: z.date(),
  category: z.string(),
});

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"];

export function ExpenseForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      amount: 0,
      date: new Date(),
      category: "",
    },
  });

  const [amount, setAmount] = useState("0");

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const NumberButton = (
    num: string,
    field: ControllerRenderProps<
      {
        title: string;
        amount: number;
        date: Date;
        category: string;
      },
      "amount"
    >,
  ) => {
    return (
      <Button
        type="button"
        className="bg-slate-800 py-8 text-2xl text-slate-300 hover:bg-slate-800 active:scale-95 active:opacity-80"
        // onClick={() => handleKeypadPress(num)}
        onClick={() => field.onChange}
      >
        {num}
      </Button>
    );
  };

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className={`${false && "ring-destructive ring-2 ring-offset-2"}`}
                  placeholder="Title of expense"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex w-full justify-between">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="mr-2 flex-grow">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="Transport">Transport</SelectItem>
                    <SelectItem value="Gifts">Gifts</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <input
                className="w-full bg-transparent py-6 text-center text-5xl font-bold"
                {...field}
                disabled
              />
              <Button
                variant="ghost"
                size="icon"
                type="button"
                className="absolute right-9 hover:bg-transparent active:scale-95 active:opacity-80"
              >
                <BackspaceIcon
                  className="h-6 opacity-40"
                  // onClick={() => handleBackspace()}
                />
              </Button>
              <div className="grid w-full max-w-sm grid-cols-3 gap-4">
                {KEYS.map((num: string) => {
                  return NumberButton(num, field);
                })}
                <Button className="bg-primary py-8 text-slate-300 active:scale-95 active:opacity-80">
                  <CheckIcon className="h-8" />
                </Button>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
