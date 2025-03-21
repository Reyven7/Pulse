import { accountApi } from "@/services/accountApi";
import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "@/services/accountSlice";
import { profileApi } from "@/services/profileApi";
import { postApi } from "@/services/postApi";
import { likeApi } from "@/services/likeApi";

const store = configureStore({
  reducer: {
    [accountApi.reducerPath]: accountApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [likeApi.reducerPath]: likeApi.reducer,
    account: accountReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(accountApi.middleware)
      .concat(profileApi.middleware)
      .concat(postApi.middleware)
      .concat(likeApi.middleware),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
