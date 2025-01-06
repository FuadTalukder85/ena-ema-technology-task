"use client";
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasksApi/TasksSlice";
import { persistStore } from "redux-persist";

import { baseApi } from "../api/baseApi";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const tasksPersistConfig = {
  key: "tasks",
  storage,
};
const persistedTasksReducer = persistReducer(tasksPersistConfig, tasksReducer);
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    tasks: persistedTasksReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Create the persistor
export const persistor = persistStore(store);

// Export the store as well
export default store;
