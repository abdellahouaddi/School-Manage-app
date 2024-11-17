import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCourse } from './CoursSlice';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newCourse, setNewCourse] = useState({ Module: '', Title: '', Poster: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Dispatch the addCourse action with the new course data
    if (newCourse.Module && newCourse.Title && newCourse.Poster) {
      dispatch(addCourse(newCourse));
      setNewCourse({ Module: '', Title: '', Poster: '' });
      navigate("/");
    }
  };

  return (
    <div className="p-8 bg-black text-gray-400">
      <h1 className="text-2xl font-bold mb-4 text-center">Add New Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Module</label>
          <input
            type="text"
            name="Module"
            value={newCourse.Module}
            onChange={handleInputChange}
            className="block w-full p-2 bg-gray-700 text-white rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            name="Title"
            value={newCourse.Title}
            onChange={handleInputChange}
            className="block w-full p-2 bg-gray-700 text-white rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Poster</label>
          <input
            type="text"
            name="Poster"
            value={newCourse.Poster}
            onChange={handleInputChange}
            className="block w-full p-2 bg-gray-700 text-white rounded"
            required
          />
        </div>
        <button type="submit" className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded">
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
