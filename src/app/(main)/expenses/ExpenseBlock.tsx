import { format, isSameDay } from "date-fns";

import ExpenseRow from "./ExpenseRow";
import { Separator } from "~/components/ui/separator";

type Props = {
  date: Date;
  expenses: {
    id: string;
    amount: number;
    title: string;
    date: Date;
    category: string;
    userId: string;
  }[];
};

export default async function ExpenseBlock(props: Props) {
  return (
    <div className="flex w-full flex-col pb-4">
      <h2 className="text-muted-foreground">
        {isSameDay(props.date, new Date())
          ? "Today"
          : format(props.date, "EEE, do MMM")}
      </h2>
      <Separator className="my-1" />
      {props.expenses.map((expense) => (
        <ExpenseRow key={expense.id} expense={expense} />
      ))}
    </div>
  );
}
