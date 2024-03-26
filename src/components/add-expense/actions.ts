"use server";

import { redirect } from "next/navigation";
import { type ExpenseSchemaType } from "~/components/add-expense/ExpenseForm";
import { api } from "~/trpc/server";

export async function createNewExpense(data: ExpenseSchemaType) {
  const setTimeToZero = (date: Date) => {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  };

  await api.expense.create({
    title: data.title,
    amount: data.amount,
    date: setTimeToZero(data.date),
    category: data.category,
  });

  redirect("/expenses");
}

export async function getCategories() {
  const user = await api.user.getById();
  return user?.categories;
}
