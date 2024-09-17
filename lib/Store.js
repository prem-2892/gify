import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import gifReducer from './features/gif/gifSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    gifs: gifReducer,
  },
})
