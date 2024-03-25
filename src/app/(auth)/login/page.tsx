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
import Link from "next/link";
import { login } from "../actions";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().trim().min(1, { message: "Email is required" }).email({
    message: "Invalid email address",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    setLoading(true);
    const error = await login(data);

    if (error !== null && error !== undefined) {
      setLoading(false);
      form.setError("password", { message: "Email or password is incorrect" });
    }
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
                      autoComplete="password"
                      {...field}
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
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
      <Link
        href="/signup"
        className="my-6 text-center text-sm text-muted-foreground"
      >
        Don&apos;t have an account?{" "}
        <span className="font-semibold text-primary">Sign up</span>
      </Link>
    </div>
  );
}
