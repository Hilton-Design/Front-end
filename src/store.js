import {configureStore, createSlice} from "@reduxjs/toolkit";


let modal = createSlice({
  name: 'modal',
  initialState: false,
  reducers: {
    toggleModal(state, bool) {
      return bool;
    }
  }
}); export let { toggleModal } = modal.actions;

let username = createSlice({
  name: 'user',
  initialState: '홍길동',
  reducers: {
    setUsername(current, newValue) {
      return newValue.payload;
    }
  }
}); export let { setUsername } = username.actions;


let isLogin = createSlice({
  name: 'isLogin',
  initialState: false,
  reducers: {
    setIsLogin(state, newValue) {
      return newValue.payload;
    }
  }
}); export let { setIsLogin } = isLogin.actions;


let jwtToken = createSlice({
  name: 'token',
  initialState: { accessToken: null, refreshToken: null },
  reducers: {
    setAccessToken(state, newToken) {
      state.accessToken = newToken.payload;
    },
    setRefreshToken(state, newToken) {
      state.refreshToken = newToken.payload;
    }
  }
}); export let { setAccessToken, setRefreshToken } = jwtToken.actions;

export default configureStore({
  reducer: {
    username: username.reducer,
    isLogin: isLogin.reducer,
    jwtToken: jwtToken.reducer,
    modal: modal.reducer
  }
})