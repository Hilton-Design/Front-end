import {configureStore, createSlice} from "@reduxjs/toolkit";

let user = createSlice({
  name: 'user',
  initialState: '홍길동',
  reducers: {
    getCurrentUserName(current, newUser) {
      return newUser.payload;
    }
  }
})
export let { getCurrentUserName } = user.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
  }
})