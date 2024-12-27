import { createSlice } from '@reduxjs/toolkit';
import { setToInitialState } from './SignupSlice';

// Initial states
const initialState = {
  login: {
    email: 'demo.user@addazakat.com',
    errorEmail: '',
    isErrorEmail: false,
    password: 'ubaida21',
    errorPassword: '',
    isErrorPassword: false,
    passwordHidden: true
  }
};

// Create a slice
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail(state, action) {
      state.login.email = action.payload;
    },
    setLoginToInitialState(state,action){
      state.login=initialState
    },

    setErrorEmail(state, action) {
      state.login.errorEmail = action.payload;
    },

    setIsErrorEmail(state, action) {
      state.login.isErrorEmail = action.payload;
    },

    setPassword(state, action) {
      state.login.password = action.payload;
    },

    setErrorPassword(state, action) {
      state.login.errorPassword = action.payload;
    },

    setIsErrorPassword(state, action) {
      state.login.isErrorPassword = action.payload;
    },

    togglePasswordVisibility(state) {
      state.login.passwordHidden = !state.login.passwordHidden;
    },
  },
});

// Export actions
export const {
  setEmail,
  setErrorEmail,
  setIsErrorEmail,
  setPassword,
  setErrorPassword,
  setIsErrorPassword,
  togglePasswordVisibility,
  setLoginToInitialState,
} = loginSlice.actions;

// Export reducer
export const loginReducer = loginSlice.reducer;

