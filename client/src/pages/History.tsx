import React, { useState, useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import { RxPaperPlane } from "react-icons/rx";
import * as dayjs from "dayjs";

type Expense = {
  id: number;
  title: string;
  amount: number;
  date: Date;
  category: string;
  currency: string;
};

export default function History() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
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

    fetchData();
  }, []);

  const thisMonth = dayjs().format("MMMM");

  const totalSpending = expenses
    .reduce((accumulator, expense) => accumulator + Number(expense.amount), 0)
    .toFixed(2);

  const uniqueDates = [
    ...new Set(
      expenses.map((expense) => dayjs(expense.date).format("YYYY-MM-DD")),
    ),
  ];

  const ExpenseBlock: React.FC<{ date: dayjs.Dayjs }> = ({ date }) => {
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

  const ExpenseRow: React.FC<{ expense: Expense }> = ({ expense }) => {
    return (
      <div className="join-item flex items-center border-b-2 border-slate-700 bg-base-100 px-6 py-4 last:border-b-0">
        <div className="">
          <RxPaperPlane size={20} className="text-secondary" />
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
        return <ExpenseBlock date={dayjs(uniqueDate)} />;
      })}
    </div>
  );
}
