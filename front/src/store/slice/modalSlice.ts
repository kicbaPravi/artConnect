import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  open: boolean;
  selectedImage?: Image;
};

const initialState: InitialState = {
  open: false,
  selectedImage: undefined
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModalAction: (
      state: InitialState,
      action: PayloadAction<Image | undefined>
    ) => {
      state.open = true;
      if (action.payload) {
        state.selectedImage = action.payload;
      }
    },
    closeModalAction: (state: InitialState) => {
      state.open = false;
      state.selectedImage = undefined;
    }
  }
});

export const { openModalAction, closeModalAction } = modalSlice.actions;

export default modalSlice.reducer;
