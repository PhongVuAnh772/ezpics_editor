import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  network: 'https://apis.ezpics.vn/apis',
}

export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    CHANGE_VALUE: (state,actions) => {
    
      state.network = actions.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { CHANGE_VALUE} = networkSlice.actions

export default networkSlice.reducer