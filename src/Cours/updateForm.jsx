import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateCourse, fetchCourses } from './CoursSlice';

const UpdateForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses } = useSelector((state) => state.courses);
  const [courseData, setCourseData] = useState({ Module: '', Title: '', Poster: '' });

  useEffect(() => {
    // Fetch courses if not loaded
    if (courses.length === 0) {
      dispatch(fetchCourses());
    } else {
      const course = courses.find((course) => course.id == parseInt(id));
      if (course) setCourseData(course); // Populate form with selected course data
    }
  }, [dispatch, id, courses]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCourse(courseData)); // Update course with modified data
    navigate('/');
  };

  return (
    <div className="w-full p-8  bg-black  text-gray-400">
      <h2 className="text-center text-2xl font-bold mb-4">Update Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block  font-semibold">Module</label>
          <input
          
            type="text"
            name="Module"
            value={courseData.Module}
            onChange={handleChange}
            className="text-white bg-lime-500 w-full p-2 rounded border border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label className="block  font-semibold">Title</label>
          <input
            type="text"
            name="Title"
            value={courseData.Title}
            onChange={handleChange}
            className="text-white bg-lime-500 w-full p-2 rounded border border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label className="block  font-semibold">Poster</label>
          <input
            type="text"
            name="Poster"
            value={courseData.Poster}
            onChange={handleChange}
            className="text-white bg-lime-500 w-full p-2 rounded border border-gray-300"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
