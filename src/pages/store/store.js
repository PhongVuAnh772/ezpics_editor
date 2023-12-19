import { configureStore } from '@reduxjs/toolkit'
import networkReducer from './slice/networkSlice'
import infoReducer from './slice/infoUser'
import authReducer from './slice/authSlice'

export const store = configureStore({
  reducer: {
    network: networkReducer,
    user: infoReducer,
    auth: authReducer,
  },
})