"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { z } from "zod";
import { cn } from "~/lib/utils";
import {
  type ControllerRenderProps,
  useForm,
  useFormState,
} from "react-hook-form";

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

import {
  BackspaceIcon,
  CalendarIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { createNewExpense, getCategories } from "./actions";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"];

const expenseSchema = z.object({
  title: z.string().min(1),
  amount: z
    .string()
    .min(1)
    .regex(/^(?!0(\.0*)?$).*$/), // Amount !== "0" || "0." || "0.0"|| "0.00"
  date: z.date(),
  category: z.string().min(1),
});

export type ExpenseSchemaType = z.infer<typeof expenseSchema>;

export function ExpenseForm(props: { closeDrawer: () => void }) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [userCategories, setUserCategories] = useState<string[]>([]);

  const form = useForm<ExpenseSchemaType>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: "",
      amount: "0",
      date: new Date(),
      category: "",
    },
    shouldFocusError: false,
  });

  const { errors } = useFormState({ control: form.control });

  const onSubmit = async (data: ExpenseSchemaType) => {
    props.closeDrawer();

    await createNewExpense(data);
    toast.success("Your expense has been saved successfully!", {
      duration: 2500,
    });
  };

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
    if (field.value.length > 7) return;
    if (key === "." && field.value.includes(".")) return;
    // Check if there are 2 or more digits after decimal place
    const regex = /\.\d{2}\b/;
    if (field.value.includes(".") && regex.test(field.value)) return;

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

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      if (categories) {
        setUserCategories(categories);
      }
    };

    fetchCategories().catch(console.error);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="relative top-[170px] flex flex-col gap-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className={`${errors.title?.message ? "animate-shake ring-2 ring-destructive ring-offset-1" : ""}`}
                    placeholder="Title of expense"
                    {...field}
                  />
                </FormControl>
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
                      {userCategories && userCategories.length > 0 ? (
                        userCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem disabled key="disabled" value="disabled">
                          Loading...
                        </SelectItem>
                      )}
                      {userCategories && userCategories.length > 0 ? (
                        userCategories.map((category) => (
                          <SelectItem
                            key={category + "2"}
                            value={category + "2"}
                          >
                            {category}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem disabled key="disabled" value="disabled">
                          Loading...
                        </SelectItem>
                      )}
                      {userCategories && userCategories.length > 0 ? (
                        userCategories.map((category) => (
                          <SelectItem
                            key={category + "1"}
                            value={category + "1"}
                          >
                            {category}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem disabled key="disabled" value="disabled">
                          Loading...
                        </SelectItem>
                      )}
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
                  <p
                    className={`${errors.amount?.message ? "animate-shake text-destructive" : "text-foreground"} 
											w-full bg-transparent py-16 text-center text-5xl font-bold`}
                    {...field}
                  >
                    <span className="relative bottom-2 pr-2 text-2xl text-muted-foreground">
                      $
                    </span>
                    {field.value}
                  </p>
                </FormControl>
                <Button
                  variant="ghost"
                  type="button"
                  className="shrink-on-tap absolute -right-2 hover:bg-transparent"
                >
                  <BackspaceIcon
                    className="h-6 text-muted-foreground"
                    onClick={() => handleBackspace(field)}
                  />
                </Button>
              </div>
              <div className="grid w-full max-w-sm grid-cols-3 gap-4">
                {KEYS.map((key: string) => (
                  <Button
                    type="button"
                    className="shrink-on-tap bg-muted py-8 text-2xl text-muted-foreground hover:bg-muted"
                    onClick={() => handleKeypadPress(key, field)}
                    key={key}
                  >
                    {key}
                  </Button>
                ))}
                <Button className="shrink-on-tap bg-primary py-8">
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
