import { combineReducers } from '@reduxjs/toolkit';
import auth from './slice/authSlice';
import pictures from './slice/pictureSlice';
import modal from './slice/modalSlice';

export type StateType = {
  // Reducers types here
};

const rootReducer = combineReducers({
  auth,
  pictures,
  modal
});

export default rootReducer;
