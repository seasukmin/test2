import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  token: "",
  uid: "",
  isAuthentication: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.uid = action.payload.uid;
      state.isAuthentication = true;

      localStorage.setItem("user", JSON.stringify(state));
    },
    removeUser: (state) => {
      state.email = "";
      state.token = "";
      state.uid = "";
      state.isAuthentication = false;

      localStorage.removeItem("user");
    },
  },
});

export default userSlice.reducer;
export const { setUser, removeUser } = userSlice.actions;
