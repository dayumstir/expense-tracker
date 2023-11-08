import express from "express";
import {
  createExpense,
  getExpensesByUser,
} from "../controllers/expenseController";

const router = express.Router();
router.post("/", createExpense);
router.get("/", getExpensesByUser);

export default router;
