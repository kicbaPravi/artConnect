import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  user: object;
  loading: boolean;
  error: boolean;
};

const initialState: InitialState = {
  user: {},
  loading: false,
  error: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSucces: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logOut: (state) => {
      state.user = {};
      state.loading = false;
      state.error = false;
    }
  }
});

export const { loginStart, loginSucces, loginFailure, logOut } =
  authSlice.actions;

export default authSlice.reducer;
