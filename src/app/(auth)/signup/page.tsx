"use client";

import Link from "next/link";
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

import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { signUp } from "../server-actions";

const signUpSchema = z.object({
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

export type SignUpSchemaType = z.infer<typeof signUpSchema>;

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    setSuccess("Check your email for further instructions");
    const result = await signUp(data);
    if (result?.error) {
      setSuccess(null);
      setError(result.error);
    }
  };

  return (
    <div className="mx-auto flex h-screen max-w-xs flex-col justify-center">
      <h1 className="pb-6 text-4xl font-semibold">Sign up</h1>
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
            Sign up
          </Button>
        </form>
      </Form>
      <div className="flex items-center gap-2 py-6">
        <hr className="w-full" />
        <p className="text-xs text-muted-foreground">OR</p>
        <hr className="w-full" />
      </div>
      <Button
        variant="outline"
        className="mb-2 w-full font-normal text-muted-foreground"
      >
        <div className="flex items-center gap-2">
          <FaApple className="h-5 w-5" />
          Continue with Apple
        </div>
      </Button>
      <Button
        variant="outline"
        className="mb-2 w-full font-normal text-muted-foreground"
      >
        <div className="flex items-center gap-2">
          <FcGoogle className="h-5 w-5" />
          Continue with Google
        </div>
      </Button>
      <Link
        href="/login"
        className="py-4 text-center text-sm text-muted-foreground"
      >
        Already have an account?{" "}
        <span className="font-semibold text-primary">Login</span>
      </Link>

      {success && (
        <div className="mb-3 mt-1 rounded-md border border-border bg-secondary/50 p-3">
          <p className="text-center text-sm font-medium text-muted-foreground">
            {success}.
          </p>
        </div>
      )}
      {error && (
        <div className="mb-3 mt-1 rounded-md border border-destructive bg-destructive/10 p-3">
          <p className="text-center text-sm font-medium text-destructive">
            {error}.
            <br />
            Please try again later.
          </p>
        </div>
      )}
    </div>
  );
}
