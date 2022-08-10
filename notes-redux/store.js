import { configureStore } from "@reduxjs/toolkit";
import noteReducer from './reducers/noteReducer';
import notificationReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';

const store = configureStore({
  reducer: {
    notes: noteReducer,
    notification: notificationReducer,
    filter: filterReducer
  }
});

export default store;
