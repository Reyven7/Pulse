import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(comicsApi.middleware),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
