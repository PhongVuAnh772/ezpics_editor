import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: [],
};

export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    CHANGE_VALUE: (state, actions) => {
      state.info = [...state.info, actions.payload];
    },
    DELETE_ALL_VALUES: (state) => {
      state.info = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { CHANGE_VALUE,DELETE_ALL_VALUES } = infoSlice.actions;

export default infoSlice.reducer;
