import { redirect } from "next/navigation";
import { getAllExpenses } from "./actions";
import { createClient } from "~/utils/supabase/server";
import { getExpensesDatesUnique } from "./actions";
import { isSameDay } from "date-fns";
import ExpenseBlock from "./ExpenseBlock";

export default async function Expenses() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error ?? !data?.user) redirect("/login");

  const expenses = await getAllExpenses();
  const uniqueDates = await getExpensesDatesUnique();

  return (
    <div className="flex w-full flex-col justify-center px-8 pb-[72px] pt-[88px]">
      <div className="flex w-full flex-col">
        {uniqueDates.map((date) => {
          const expensesOnThatDate = expenses.filter((expense) =>
            isSameDay(expense.date, date),
          );

          return (
            <ExpenseBlock
              key={date.toString()}
              date={date}
              expenses={expensesOnThatDate}
            />
          );
        })}
      </div>
    </div>
  );
}
