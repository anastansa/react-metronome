import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AnimationState {
  value: number;
}

const initialState: AnimationState = {
  value: 0,
};

export const animationSlice = createSlice({
  name: 'animation',
  initialState,
  reducers: {
    changeAnimationId: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { changeAnimationId } =
  animationSlice.actions;

export default animationSlice.reducer;
