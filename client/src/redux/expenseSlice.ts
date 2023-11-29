import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Expense = {
  id: number | undefined;
  currency: string | undefined;
  amount: number | undefined;
  title: string | undefined;
  date: Date | undefined;
  category: string | undefined;
};

const initialState: Expense = {
  id: undefined,
  currency: undefined,
  amount: undefined,
  title: undefined,
  date: undefined,
  category: undefined,
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
