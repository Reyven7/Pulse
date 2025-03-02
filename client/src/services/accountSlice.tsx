import { UserShortData } from "@/models/user";
import { RootState } from "@/redux/store";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountState {
  user: UserShortData | null;
}

const initialState: AccountState = {
  user: null,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    setUser: (state, action: PayloadAction<UserShortData>) => {
      state.user = action.payload;
    },
  },  
});

export const selectUser = (state: RootState) => state.account.user;
export const isAuthenticated = createSelector(
  selectUser,
  (user) => user !== null
);
export const { logout, setUser } = accountSlice.actions;
export default accountSlice.reducer;
