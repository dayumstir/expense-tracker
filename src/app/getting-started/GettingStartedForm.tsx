"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createNewUser } from "~/app/getting-started/actions";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "../../components/ui/toggle-group";
import { toast } from "sonner";

const defaultCategories = [
  "Food",
  "Entertainment",
  "Transport",
  "Fashion",
  "Travel",
  "Healthcare",
  "Gifts",
  "Subscriptions",
  "Sports",
  "Others",
];

const defaultSelectedCategories = [
  "Food",
  "Entertainment",
  "Transport",
  "Fashion",
  "Travel",
];

const newUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, {
      message: "Name is required",
    })
    .min(2, {
      message: "Name must be at least 2 characters",
    })
    .max(10, { message: "Name cannot be longer than 10 characters" }),
  categories: z
    .string()
    .array()
    .nonempty({ message: "Please select at least one category" }),
});

export type NewUserSchemaType = z.infer<typeof newUserSchema>;

export default function GettingStartedForm() {
  const form = useForm<NewUserSchemaType>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      name: "",
      categories: defaultSelectedCategories,
    },
    shouldFocusError: false,
  });

  const onSubmit = async (values: NewUserSchemaType) => {
    await createNewUser(values);

    toast.success("Welcome to Penny!", {
      duration: 2500,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <h1 className="text-4xl font-semibold">Getting started</h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormDescription>
                Don&apos;t worry, you can change this later.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Categories</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="multiple"
                  className="flex max-w-xs flex-wrap justify-start"
                  defaultValue={defaultSelectedCategories}
                  onValueChange={field.onChange}
                >
                  {defaultCategories.map((category) => (
                    <ToggleGroupItem
                      key={category}
                      value={category}
                      defaultChecked
                      className="shrink-on-tap hover:bg-transparent hover:text-foreground data-[state=on]:bg-primary/40"
                    >
                      {category}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </FormControl>
              <FormDescription>
                Tap to select/deselect default categories.
                <br /> You can add your own categories later.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </Form>
  );
}
