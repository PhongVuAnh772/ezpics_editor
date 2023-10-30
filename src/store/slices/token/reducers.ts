import { IFontFamily, Resource } from "~/interfaces/editor"
import { createReducer,createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'


export interface tokenState {
  token: string | null,
  id: string | null
}

const initialState: tokenState = {
  token: '',
  id: '',
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    REPLACE_TOKEN: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    REPLACE_ID_USER: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
})

export const {REPLACE_TOKEN,REPLACE_ID_USER} = tokenSlice.actions;
// export const selectCount = (state: RootState) => state.login.loggedIn;
export default tokenSlice.reducer;
