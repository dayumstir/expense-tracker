"use server";

import { api } from "~/trpc/server";

export async function getAllExpenses() {
  const expenses = await api.expense.getAll();
  return expenses;
}

export async function getExpensesDatesUnique() {
  const uniqueDates = await api.expense.getUniqueDates();
  return uniqueDates;
}

export async function getCategories() {
  const user = await api.user.getById();
  return user?.categories;
}
