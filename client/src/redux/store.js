import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import memosReducer from "./features/memosSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    memos: memosReducer,
  },
});

export { store };
