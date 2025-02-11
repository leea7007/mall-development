import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import getStoredState from "redux-persist/es/getStoredState";

const rootReducer = combineReducers({
  user: userReducer,
  // post: postReducer,
});

const persistConfig = {
  key: "root", //key name
  storage, // ssave on localStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }), //serializable한지 체크를 항상 하기 때문에 꺼놓기
});

/*
export const store = configureStore({
  reducer: {
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],  //serializable한지 체크를 항상 하기 때문에 꺼놓기
        },
      });
    },
  },
});
*/
export const persistor = persistStore(store);
