import { accountApi } from "@/services/accountApi";
import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "@/services/accountSlice";
import { profileApi } from "@/services/profileAPI";
import { postApi } from "@/services/postApi";

const store = configureStore({
  reducer: {
    [accountApi.reducerPath]: accountApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    account: accountReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(accountApi.middleware)
      .concat(profileApi.middleware)
      .concat(postApi.middleware),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
