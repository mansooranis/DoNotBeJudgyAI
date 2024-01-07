import { createSlice } from '@reduxjs/toolkit'

export const codeDataSlice = createSlice({
  name: 'codeData',
  initialState: {
    codeDataResponse: null,
    loadingData: false,
  },
  reducers: {
    updateData: (state, action) => {
      state.codeDataResponse = action.payload
    },
    updateLoading: (state, action) => {
      state.loadingData = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateData, updateLoading } = codeDataSlice.actions

export default codeDataSlice.reducer