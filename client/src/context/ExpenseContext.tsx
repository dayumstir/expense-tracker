import { createContext } from "react";
import Expense from "../types/Expense";

type ExpenseContextType = {
  currentExpense: Expense | null;
  setCurrentExpense: React.Dispatch<React.SetStateAction<Expense | null>>;
};

const ExpenseContext = createContext<ExpenseContextType>({
  currentExpense: null,
  setCurrentExpense: () => {},
});

export default ExpenseContext;
