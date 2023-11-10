import prisma from "../db";
import { Request, Response } from "express";

const createExpense = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
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
    const userId = parseInt(req.params.userId);
    const expenses = await prisma.expense.findMany({
      where: {
        userId: userId,
      },
    });
    res.json(expenses);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.log("Unexpected error", err);
    }
  }
};

export { createExpense, getExpensesByUser };
