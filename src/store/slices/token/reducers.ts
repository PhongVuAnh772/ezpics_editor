import { IFontFamily, Resource } from "~/interfaces/editor"
import { createReducer,createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'


export interface tokenState {
  token: string
}

const initialState: tokenState = {
  token: '',
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    REPLACE_TOKEN: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
})

export const {REPLACE_TOKEN} = tokenSlice.actions;
// export const selectCount = (state: RootState) => state.login.loggedIn;
export default tokenSlice.reducer;
