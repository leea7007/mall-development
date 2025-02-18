import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // userSlice import
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

// rootReducer 설정
const rootReducer = combineReducers({
  user: userReducer, // user slice가 잘 연결되어 있는지 확인
});

// persist 설정
const persistConfig = {
  key: "root",
  storage, // persist storage 설정
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // persistedReducer를 사용해야 합니다.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// persistStore 설정
export const persistor = persistStore(store);

export default store;
