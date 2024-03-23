"use client";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email address",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .max(20),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    console.log(data);
  };

  return (
    <div className="mx-auto flex h-screen max-w-xs flex-col justify-center">
      <h1 className="pb-6 text-4xl font-semibold">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="pb-4">
                <FormLabel className="text-muted-foreground">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your email address"
                    type="email"
                    autoComplete="email"
                    {...field}
                    className="placeholder:text-muted-foreground/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="pb-6">
                <FormLabel className="text-muted-foreground">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Your password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      {...field}
                      className="placeholder:text-muted-foreground/50"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
                    >
                      {showPassword ? (
                        <EyeIcon className="h-4" />
                      ) : (
                        <EyeSlashIcon className="h-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}
