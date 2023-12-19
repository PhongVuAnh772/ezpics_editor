import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authentication: false,
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    CHANGE_VALUE_TOKEN: (state, actions) => {
      state.token = actions.payload;
    },
    CHANGE_STATUS_AUTH: (state, actions) => {
      state.authentication = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { CHANGE_VALUE_TOKEN,CHANGE_STATUS_AUTH } = authSlice.actions;

export default authSlice.reducer;
