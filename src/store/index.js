import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userProfileSlice from "./slices/userProfileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userProfile: userProfileSlice,
    // Add other reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
