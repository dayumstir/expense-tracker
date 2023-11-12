import { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import * as dayjs from "dayjs";
import { Expense } from "../../modelTypes";
import ExpenseContext from "../../context/ExpenseContext";
import ExpenseIcon from "./components/ExpenseIcon";

type ExpenseRowProps = {
  expense: Expense;
};

type ExpenseBlockProps = {
  date: dayjs.Dayjs;
};

export default function History() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { currentExpense, setCurrentExpense } = useContext(ExpenseContext);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/expenses/${currentUser?.id}`,
      );
      setExpenses(response.data);
    } catch (error) {
      console.error("Expense retrieval failed:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentExpense]);

  const thisMonth = dayjs().format("MMMM");

  const totalSpending = expenses
    .reduce((accumulator, expense) => accumulator + Number(expense.amount), 0)
    .toFixed(2);

  const uniqueDates = [
    ...new Set(
      expenses.map((expense) => dayjs(expense.date).format("YYYY-MM-DD")),
    ),
  ];

  const handleEditExpense = (e: Expense) => {
    setCurrentExpense(e);
  };

  const ExpenseRow = ({ expense }: ExpenseRowProps) => {
    return (
      <div
        className="join-item flex cursor-pointer items-center border-b-2 border-slate-700 bg-base-100 px-6 py-4 last:border-b-0 hover:opacity-80"
        onClick={() => handleEditExpense(expense)}
      >
        <div className="">
          <ExpenseIcon category={expense.category} />
        </div>
        <div className="pl-6">
          <div className="">{expense.title}</div>
          <div className="text-xs text-slate-500">{expense.category}</div>
        </div>
        <div className="ml-auto">
          {expense.currency !== "SGD"}
          {"-$" + expense.amount}
        </div>
      </div>
    );
  };

  const ExpenseBlock = ({ date }: ExpenseBlockProps) => {
    const expensesWithMatchingDate = expenses.filter((e) => {
      const expenseDate = dayjs(e.date);
      return date.isSame(expenseDate, "day");
    });

    return (
      <div className="pb-8">
        <div className="pb-4 text-lg font-semibold">
          {date.format("DD MMMM")}
        </div>
        <div className="join join-vertical w-full">
          {expensesWithMatchingDate.map((expense) => {
            return <ExpenseRow expense={expense} key={expense.id} />;
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="mb-16 p-8">
      <h1 className="text-3xl font-bold">History</h1>
      <div className="tabs-boxed tabs mx-auto mt-4">
        <a className="tab w-1/3">Date</a>
        <a className="tab tab-active w-1/3">Month</a>
        <a className="tab w-1/3">Year</a>
      </div>
      <div className="py-4">
        <div>
          In <span className="font-semibold">{thisMonth}</span> you spent a
          total of
        </div>
        <div className="text-2xl font-bold text-secondary">
          {"$" + totalSpending}
        </div>
        {/* <graph></graph> */}
      </div>
      {uniqueDates.map((uniqueDate) => {
        return <ExpenseBlock date={dayjs(uniqueDate)} key={uniqueDate} />;
      })}
    </div>
  );
}
