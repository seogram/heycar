import { configureStore } from "@reduxjs/toolkit";
import { pollApi } from "./services/poll";
import { setupListeners } from "@reduxjs/toolkit/query";


export const store = configureStore({
  reducer: {
    [pollApi.reducerPath]: pollApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pollApi.middleware),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch