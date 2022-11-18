import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  refresh: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
    refreshUser: (state, action) => {
      state.refresh = action.payload;
      console.log(state.refresh);
    },
  },
});

export const selectCurrentUser = (state) => state.auth.user;

export const selectToken = (state) => state.auth.token;

export const selectRefUserData = (state) => state.auth.refresh;
console.log(selectRefUserData);
export const { logIn, logOut, refreshUser } = authSlice.actions;

export default authSlice.reducer;
