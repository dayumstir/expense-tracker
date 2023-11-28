import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: number | null;
  name: string | null;
  email: string | null;
};

const initialState: User = {
  id: null,
  name: null,
  email: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
    resetUser: (state) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
