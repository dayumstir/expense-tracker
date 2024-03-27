"use server";

import { api } from "~/trpc/server";

export async function getExpensesDatesUnique() {
  const uniqueDates = await api.expense.getDates();
  return uniqueDates;
}
