"use server";

import { createClient } from "~/utils/supabase/server";
import { cookies, headers } from "next/headers";
import { type SignUpSchemaType } from "./signup/page";
import { type LoginSchemaType } from "./login/page";

const supabase = createClient(cookies());
const origin = headers().get("origin");

export const signUp = async (data: SignUpSchemaType) => {
  "use server";

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return {
      error: error.message,
    };
  }
};

export const login = async (data: LoginSchemaType) => {
  "use server";

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  if (error) {
    return {
      error: error.message,
    };
  }
};
