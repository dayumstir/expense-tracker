"use server";

import { api } from "~/trpc/server";
import { type ExpenseEditSchemaType } from "./ExpenseEditForm";
import { redirect } from "next/navigation";

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

export async function updateExpense(data: ExpenseEditSchemaType) {
  await api.expense.update({
    id: data.id,
    title: data.title,
    amount: data.amount,
    date: data.date,
    category: data.category,
  });
  redirect("/expenses");
}

export async function deleteExpense(id: string) {
  await api.expense.delete({ id });
  redirect("/expenses");
}
