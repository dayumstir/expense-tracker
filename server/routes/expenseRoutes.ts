import express from "express";
import {
  createExpense,
  getExpensesByUser,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController";

const router = express.Router();
router.post("/:userId", createExpense);
router.get("/:userId", getExpensesByUser);
router.put("/:expenseId", updateExpense);
router.delete("/:expenseId", deleteExpense);

export default router;
