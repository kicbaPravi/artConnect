import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import api from '../../config/axios';

type InitialState = {
  loading: boolean;
  pictures: [];
  filters: Record<string, any>;
  totalRecords: null | number;
  totalPages: null | number;
  page: null | number;
  error: string;
};

const initialState: InitialState = {
  loading: false,
  pictures: [],
  filters: {},
  totalRecords: null,
  totalPages: null,
  page: null,
  error: ''
};

export const fetchPictures = createAsyncThunk(
  '/gallery/images',
  async (_: undefined, { getState }: any) => {
    const filters = getState().pictures.filters;
    const page = getState().pictures.page;
    const authUserId = getState().auth.user._id;

    const response = await api.get('/gallery/images/', {
      params: {
        authUserId,
        page,
        ...filters
      }
    });

    if (response) return response.data;
  }
);

export const pictureSlice = createSlice({
  name: 'pictures',
  initialState,
  reducers: {
    addFilters: (state, action: PayloadAction<any>) => {
      state.filters = action.payload;
    },
    removeFilter: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      delete state.filters[key];
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    }
  },
  extraReducers: (builder: any) => {
    builder.addCase(fetchPictures.pending, (state: InitialState) => {
      state.loading = true;
    });
    builder.addCase(
      fetchPictures.fulfilled,
      (state: InitialState, action: any) => {
        state.loading = false;
        state.pictures = action.payload.images;
        state.totalRecords = action.payload.totalRecords;
        state.totalPages = action.payload.totalPages;
        // state.page = action.payload.currentPage;
        state.error = '';
      }
    );
    builder.addCase(
      fetchPictures.rejected,
      (state: InitialState, action: any) => {
        state.loading = false;
        state.pictures = [];
        state.error = action.error.message;
      }
    );
  }
});

export const { addFilters, removeFilter, setPage } = pictureSlice.actions;

export default pictureSlice.reducer;
