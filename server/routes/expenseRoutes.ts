import express from "express";
import {
  createExpense,
  getExpensesByUser,
  updateExpense,
} from "../controllers/expenseController";

const router = express.Router();
router.post("/:userId", createExpense);
router.get("/:userId", getExpensesByUser);
router.put("/:expenseId", updateExpense);

export default router;
