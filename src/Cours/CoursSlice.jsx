import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Example API endpoint (adjust as needed)
const API_URL = "http://localhost:3007/Cours";

// Async thunks for API calls
export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await fetch(API_URL);
  return response.json();
});

export const addCourse = createAsyncThunk('courses/addCourse', async (newCourse) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newCourse),
  });
  return response.json();
});

export const updateCourse = createAsyncThunk('courses/updateCourse', async (updatedCourse) => {
  const response = await fetch(`${API_URL}/${updatedCourse.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedCourse),
  });
  return response.json();
});

export const deleteCourse = createAsyncThunk('courses/deleteCourse', async (courseId) => {
  await fetch(`${API_URL}/${courseId}`, {
    method: 'DELETE',
  });
  return courseId; // Return the id of the deleted course for reducer logic
});

const initialState = {
  courses: [],
  status: 'idle',
  error: null,
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch courses
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Add a new course
      .addCase(addCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload);
      })

      // Update an existing course
      .addCase(updateCourse.fulfilled, (state, action) => {
        const index = state.courses.findIndex(course => course.id === action.payload.id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      })

      // Delete a course
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter(course => course.id !== action.payload);
      });
  },
});

export default courseSlice.reducer;
