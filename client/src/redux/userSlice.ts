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
    setUserId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserId, setUserName, setUserEmail } = userSlice.actions;

export default userSlice.reducer;
