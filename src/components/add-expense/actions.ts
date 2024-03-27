"use server";

import { redirect } from "next/navigation";
import { type ExpenseSchemaType } from "~/components/add-expense/ExpenseForm";
import { api } from "~/trpc/server";

export async function createNewExpense(data: ExpenseSchemaType) {
  await api.expense.create({
    title: data.title,
    amount: data.amount,
    date: data.date,
    category: data.category,
  });
  redirect("/expenses");
}

export async function getAllExpenses() {
  const expenses = await api.expense.getAll();
  return expenses;
}

export async function getCategories() {
  const user = await api.user.getById();
  return user?.categories;
}
