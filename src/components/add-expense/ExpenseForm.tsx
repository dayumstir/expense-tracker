"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  BackspaceIcon,
  CalendarIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import { ControllerRenderProps, useForm, useFormState } from "react-hook-form";
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

type Props = {
  closeDrawer: () => void;
};

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"];

const FormSchema = z.object({
  title: z.string().min(1),
  amount: z
    .string()
    .min(1)
    .regex(/^(?!0(\.0*)?$).*$/), // Amount !== "0" || "0." || "0.0"|| "0.00"
  date: z.date(),
  category: z.string().min(1),
});

export function ExpenseForm(props: Props) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      amount: "0",
      date: new Date(),
      category: "",
    },
  });

  const { errors } = useFormState({ control: form.control });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    props.closeDrawer();

    toast.success("Your expense has been saved successfully!", {
      duration: 2500,
    });
  }

  const handleKeypadPress = (
    key: string,
    field: ControllerRenderProps<
      {
        title: string;
        amount: string;
        date: Date;
        category: string;
      },
      "amount"
    >,
  ) => {
    if (field.value.length > 7) {
      return;
    }
    if (key === "." && field.value.includes(".")) {
      return;
    }
    // Check if there are 2 or more digits after decimal place
    const regex = /\.\d{2}\b/;
    if (field.value.includes(".") && regex.test(field.value)) {
      return;
    }

    if (field.value === "0" && key !== ".") {
      field.onChange(key);
    } else {
      field.onChange(field.value + key);
    }
  };

  const handleBackspace = (
    field: ControllerRenderProps<
      {
        title: string;
        amount: string;
        date: Date;
        category: string;
      },
      "amount"
    >,
  ) => {
    if (field.value.length === 1) {
      field.onChange("0");
    } else {
      field.onChange(field.value.slice(0, -1));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="relative top-44 flex flex-col gap-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className={`${errors.title?.message ? "animate-shake ring-2 ring-destructive ring-offset-1" : ""}
											`}
                    placeholder="Title of expense"
                    {...field}
                  />
                </FormControl>
                {}
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <FormField
              name="date"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mr-2 flex-grow">
                  <Popover
                    open={isCalendarOpen}
                    onOpenChange={setIsCalendarOpen}
                  >
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
                            format(field.value, "EEE, do MMMM")
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
                        onSelect={(e) => {
                          field.onChange(e);
                          setIsCalendarOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`${errors.category?.message ? "animate-shake ring-2 ring-destructive ring-offset-1" : ""}`}
                      >
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent align="end">
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Entertainment">
                        Entertainment
                      </SelectItem>
                      <SelectItem value="Transport">Transport</SelectItem>
                      <SelectItem value="Gifts">Gifts</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="relative bottom-24 flex items-center">
                <FormControl>
                  <input
                    className={`${errors.amount?.message ? "animate-shake text-destructive" : ""} 
											w-full bg-transparent py-16 text-center text-5xl font-bold`}
                    {...field}
                    disabled
                  />
                </FormControl>
                <Button
                  variant="ghost"
                  type="button"
                  className="absolute right-0 hover:bg-transparent active:scale-95 active:opacity-80"
                >
                  <BackspaceIcon
                    className="h-6 opacity-40"
                    onClick={() => handleBackspace(field)}
                  />
                </Button>
              </div>
              <div className="grid w-full max-w-sm grid-cols-3 gap-4">
                {KEYS.map((key: string) => (
                  <Button
                    type="button"
                    className="bg-slate-800 py-8 text-2xl text-slate-300 hover:bg-slate-800 active:scale-95 active:opacity-80"
                    onClick={() => handleKeypadPress(key, field)}
                    key={key}
                  >
                    {key}
                  </Button>
                ))}
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
