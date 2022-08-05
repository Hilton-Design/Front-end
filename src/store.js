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

let commuteStandard = createSlice({
  name: 'commuteStandard',
  initialState: 0,
  reducers: {
    setStandard(current, newStandard) {
      return newStandard.payload;
    }
  }
})
export let { setStandard } = commuteStandard.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    commuteStandard: commuteStandard.reducer,
  }
})