import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: {} };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

//action
const { setUser } = userSlice.actions;
export { setUser };
//reducer
export default userSlice.reducer;
