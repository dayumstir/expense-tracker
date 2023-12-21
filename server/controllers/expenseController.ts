import prisma from "../db";
import { Request, Response } from "express";
import dayjs from "dayjs";

const createExpense = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const { currency, amount, title, date, category } = req.body;

    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (userExists) {
      const newExpense = await prisma.expense.create({
        data: {
          currency,
          amount: Number(amount),
          title,
          date,
          category,
          user: {
            connect: { id: userId },
          },
        },
      });

      res.json(newExpense);
    } else {
      throw new Error(`User with ID ${userId} does not exist.`);
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ error: err.message });
      console.error(err.message);
    } else {
      console.log("Unexpected error", err);
    }
  }
};

const getExpensesByUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const expenses = await prisma.expense.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        date: "desc",
      },
      select: {
        id: true,
        currency: true,
        amount: true,
        title: true,
        date: true,
        category: true,
        // Exclude userId
      },
    });
    res.json(expenses);
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ error: err.message });
      console.error(err.message);
    } else {
      console.log("Unexpected error", err);
    }
  }
};

const updateExpense = async (req: Request, res: Response) => {
  try {
    const expenseId = Number(req.params.expenseId);
    await prisma.expense.findUnique({
      where: {
        id: expenseId,
      },
    });

    const { currency, amount, title, date, category } = req.body;
    const updatedExpense = await prisma.expense.update({
      where: { id: Number(expenseId) },
      data: {
        currency,
        amount: Number(amount),
        title,
        date,
        category,
      },
    });
    res.json(updatedExpense);
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ error: err.message });
      console.error(err.message);
    } else {
      console.log("Unexpected error", err);
    }
  }
};

const deleteExpense = async (req: Request, res: Response) => {
  try {
    const expenseId = Number(req.params.expenseId);
    const expense = await prisma.expense.delete({
      where: {
        id: expenseId,
      },
    });
    res.json(expense);
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ error: err.message });
      console.error(err.message);
    } else {
      console.log("Unexpected error", err);
    }
  }
};

const getLastXMonthsExpensesTotalByMonth = async (
  req: Request,
  res: Response
) => {
  const userId = Number(req.params.userId);
  const numOfMonthsInThePast = Number(req.params.numOfMonthsInThePast);

  const lastDayOfThisMonth = dayjs().endOf("month");
  const firstDayOfXMonthsAgo = dayjs()
    .subtract(numOfMonthsInThePast, "months")
    .startOf("month");

  const expenses = await prisma.expense.findMany({
    where: {
      userId: userId,
      date: {
        gte: firstDayOfXMonthsAgo.toISOString(),
        lte: lastDayOfThisMonth.toISOString(),
      },
    },
    orderBy: {
      date: "desc",
    },
    select: {
      amount: true,
      date: true,
    },
  });

  type monthlyTotal = {
    month: string;
    amount: number;
  };

  let expensesTotalByMonth: monthlyTotal[] = [];
  expenses.forEach((expense) => {
    const monthStr = dayjs(expense.date).format("MMM");
    const expensesTotal = expensesTotalByMonth.find(
      (monthlyTotal) => monthlyTotal.month === monthStr
    );
    if (expensesTotal) {
      expensesTotal.amount += Number(expense.amount);
    } else {
      expensesTotalByMonth.push({
        month: monthStr,
        amount: Number(expense.amount),
      });
    }
  });

  res.json(expensesTotalByMonth);
};

export {
  createExpense,
  getExpensesByUser,
  updateExpense,
  deleteExpense,
  getLastXMonthsExpensesTotalByMonth,
};
