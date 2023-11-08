import prisma from "../db";
import { Request, Response } from "express";

const createExpense = async (req: Request, res: Response) => {
  try {
    const { currency, amount, title, date, category } = req.body;
    const expense = await prisma.expense.create({
      data: { currency, amount, title, date, category },
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

const getExpensesByUser = async (req: Request, res: Response) => {
  try {
    // const { userId } = req.body;
    // const expense = await prisma.expense.findMany({
    //   where: {
    //     userId: userId,
    //   },
    // });
    // res.json(expense);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.log("Unexpected error", err);
    }
  }
};

export { createExpense, getExpensesByUser };
