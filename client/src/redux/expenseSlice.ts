import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Expense = {
  id: number | null;
  currency: string | null;
  amount: number | null;
  title: string | null;
  date: Date | null;
  category: string | null;
};

const initialState: Expense = {
  id: null,
  currency: null,
  amount: null,
  title: null,
  date: null,
  category: null,
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setExpense: (state, action: PayloadAction<Expense>) => {
      return action.payload;
    },
    resetExpense: (state) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setExpense, resetExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
