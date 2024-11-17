// store.js
import { configureStore } from '@reduxjs/toolkit';
import reducer from './CoursSlice'; // Import your course slice

// Create a Redux store and pass in the reducers
const store = configureStore({
  reducer: {
    courses: reducer, // Add the course slice to the store
  }
});

export default store;
