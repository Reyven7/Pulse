import { UserProfile } from "@/models/user";
import { RootState } from "@/Redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountState
{
    user: UserProfile | null
    role: string | null;
    token: string | null;
}

const initialState: AccountState = {
    user: null,
    role: null,
    token: null,
};

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        logout: (state) => 
        {
            state.user = null;
            state.role = null;
            state.token = null;
            localStorage.clear()
        },
        setUser: (state, action: PayloadAction<UserProfile>) => 
        {
            state.user = action.payload;
            state.token = state.user.token
            state.role = state.user.role
        },
    },
});

export const getRole = (state: { account: AccountState }) => state.account.role;
export const isAuthenticated = (state: RootState): boolean => !!state.account.token;


export const { logout, setUser } = accountSlice.actions;
export default accountSlice.reducer;
