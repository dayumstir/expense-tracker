"use server";

import { redirect } from "next/navigation";
import { type NewUserSchemaType } from "~/app/getting-started/GettingStartedForm";
import { api } from "~/trpc/server";

export async function createNewUser(data: NewUserSchemaType) {
  const user = await api.user.create({
    name: data.name,
    categories: data.categories,
  });

  if (!user) redirect("/error");

  redirect("/");
}
