"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "~/utils/supabase/server";
import { SignUpSchemaType } from "./signup/page";
import { LoginSchemaType } from "./login/page";

export async function signUp(data: SignUpSchemaType) {
  const supabase = createClient();

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
export async function login(data: LoginSchemaType) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) return error;

  revalidatePath("/", "layout");
  redirect("/");
}
