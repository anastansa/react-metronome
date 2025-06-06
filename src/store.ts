import { configureStore } from '@reduxjs/toolkit';
import animationReducer from './animationSlice';

export const store = configureStore({
  reducer: {
    animation: animationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
