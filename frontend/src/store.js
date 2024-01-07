import { configureStore } from '@reduxjs/toolkit'
import codeDataReducer from './feature/codeData/codeDataSlice'

export default configureStore({
  reducer: {
    codeData: codeDataReducer,
  },
})