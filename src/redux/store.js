import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userApi } from './userApi'; // Import the user API slice
import userReducer from './userSlice'; // Import your user slice

export const store = configureStore({
  reducer: {
    user: userReducer, // Add the user slice reducer to the store
    [userApi.reducerPath]: userApi.reducer, // Add the API slice reducer to the store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware), // Add API middleware
});

// Optional: Setup listeners for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);
