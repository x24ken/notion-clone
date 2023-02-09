import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

const memosSlice = createSlice({
  name: "memos",
  initialState,
  reducers: {
    setMemos: (state, action) => {
      state.value = action.payload;
    },
  },
});

//action
const { setMemos } = memosSlice.actions;
export { setMemos };
//reducer
export default memosSlice.reducer;
