import express from "express";
import {
  createExpense,
  getExpensesByUser,
} from "../controllers/expenseController";

const router = express.Router();
router.post("/:userId", createExpense);
router.get("/:userId", getExpensesByUser);

export default router;
