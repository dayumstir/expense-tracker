import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import expenseSlice from "./expenseSlice";
import toastSlice from "./toastSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    expense: expenseSlice,
    toast: toastSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
