import { accountApi } from "@/services/accountApi";
import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "@/services/accountSlice";

const store = configureStore({
  reducer: {
    [accountApi.reducerPath]: accountApi.reducer,
    account: accountReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(accountApi.middleware),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
