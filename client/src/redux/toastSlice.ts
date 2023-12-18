import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Toast = {
  type: "success" | "error" | undefined;
  message: string;
};

const initialState: Toast = {
  type: undefined,
  message: "",
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<Toast>) => {
      return action.payload;
    },
    resetToast: (state) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToast, resetToast } = toastSlice.actions;

export default toastSlice.reducer;
