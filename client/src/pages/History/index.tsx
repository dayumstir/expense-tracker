import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Expense, setExpense } from "../../redux/expenseSlice";
import ExpenseIcon from "./components/ExpenseIcon";
import Tabs from "./components/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { formatAmount } from "../../utils";
import PieChart from "./components/PieChart";

export default function History() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [month, setMonth] = useState(dayjs().month());
  const [year, setYear] = useState(dayjs().year());

  const userId = useSelector((state: RootState) => state.user.id);
  const currExpense = useSelector((state: RootState) => state.expense);
  const dispatch = useDispatch();

  const fetchUserExpenses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/expenses/${userId}`,
      );
      setExpenses(response.data);
    } catch (error) {
      console.error("Expense retrieval failed");
    }
  };

  useEffect(() => {
    fetchUserExpenses();
  }, []);

  useEffect(() => {
    fetchUserExpenses();
  }, [currExpense]);

  const expensesOfMonth = expenses.filter((expense) => {
    const date = dayjs(expense.date);
    return date.month() === month && date.year() === year;
  });

  const totalSpending = expensesOfMonth.reduce(
    (total, expense) => total + Number(expense.amount),
    0,
  );

  const uniqueDates = [
    ...new Set(
      expensesOfMonth.map((expense) =>
        dayjs(expense.date).format("YYYY-MM-DD"),
      ),
    ),
  ];

  const categoryTotals: { [category: string]: number } = {};
  expensesOfMonth.forEach((expense) => {
    const { category, amount } = expense;

    if (category && amount) {
      if (categoryTotals[category] !== undefined) {
        categoryTotals[category] += Number(amount);
      } else {
        categoryTotals[category] = Number(amount);
      }
    }
  });

  const handleEditExpense = (e: Expense) => {
    dispatch(setExpense(e));
  };

  const ExpenseRow = ({ expense }: { expense: Expense }) => {
    return (
      <div
        className="join-item flex cursor-pointer items-center border-b-2 border-slate-700 bg-base-100 px-6 py-4 last:border-b-0 hover:opacity-80"
        onClick={() => handleEditExpense(expense)}
      >
        <div className="text-xl text-secondary">
          <ExpenseIcon category={expense.category!} />
        </div>
        <div className="pl-6">
          <div className="">{expense.title}</div>
          <div className="text-xs text-slate-500">{expense.category}</div>
        </div>
        <div className="ml-auto">
          -{formatAmount(Number(expense.amount), expense.currency)}
        </div>
      </div>
    );
  };

  const ExpenseBlock = ({ date }: { date: dayjs.Dayjs }) => {
    const expensesWithSameDate = expensesOfMonth.filter((e) => {
      const expenseDate = dayjs(e.date);
      return date.isSame(expenseDate, "day");
    });

    return (
      <div className="pb-4">
        <div className="pb-2 text-lg font-semibold">
          {date.format("DD MMMM")}
        </div>
        <div className="join join-vertical w-full">
          {expensesWithSameDate.map((expense) => (
            <ExpenseRow expense={expense} key={expense.id} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">History</h1>
      <div className="pt-4">
        <Tabs month={month} setMonth={setMonth} year={year} setYear={setYear} />
      </div>
      <div className="py-4">
        <div>
          In{" "}
          <span className="font-bold">
            {dayjs().month(month).format("MMMM")}
          </span>{" "}
          you spent a total of
        </div>
        <div className="text-2xl font-bold text-secondary">
          {formatAmount(totalSpending)}
        </div>
        {/* TODO: pie chart with category breakdown */}
        <div className="h-64 w-screen -ml-8">
          <PieChart categoryTotals={categoryTotals} />
        </div>
      </div>
      {uniqueDates.map((uniqueDate) => (
        <ExpenseBlock date={dayjs(uniqueDate)} key={uniqueDate} />
      ))}
    </div>
  );
}
