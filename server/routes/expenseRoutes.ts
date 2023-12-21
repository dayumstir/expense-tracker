import express from "express";
import {
  createExpense,
  getExpensesByUser,
  updateExpense,
  deleteExpense,
  getLastXMonthsExpensesTotalByMonth,
} from "../controllers/expenseController";

const router = express.Router();
router.post("/:userId", createExpense);
router.get("/:userId", getExpensesByUser);
router.put("/:expenseId", updateExpense);
router.delete("/:expenseId", deleteExpense);
router.get(
  "/:userId/:numOfMonthsInThePast",
  getLastXMonthsExpensesTotalByMonth
);

export default router;
