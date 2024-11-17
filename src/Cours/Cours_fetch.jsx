import { IoAdd } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { IoTrash, IoCreate } from "react-icons/io5"; // Import delete and update icons
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCourses, addCourse, deleteCourse } from './CoursSlice';

const Cours_fetch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses, status, error } = useSelector((state) => state.courses);
  const [newCourse, setNewCourse] = useState({ Module: '', Title: '', Poster: '' });
  const [selectedModule, setSelectedModule] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCourses());
    }
  }, [dispatch, status]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  const filteredCourses = selectedModule
    ? courses.filter((course) => course.Module === selectedModule)
    : courses;

  const handleAddCourse = () => {
    navigate('/add-course');
  };

  const handleUpdateCourse = (id) => {
    navigate(`/update-course/${id}`);
  };

  const handleDeleteCourse = (id) => {
    dispatch(deleteCourse(id));
  };

  return (
    <div className="bg-black p-8 text-gray-400">
      <h1 className="text-center text-2xl font-bold mb-4">Course List</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Modules</label>
        <select
          className="block w-1/2 px-3 py-2 bg-lime-500 border border-gray-300 rounded-md shadow-sm text-white"
          value={selectedModule}
          onChange={(e) => setSelectedModule(e.target.value)}
        >
          <option value="">Select Module...</option>
          <option value="">All</option>
          <option value="M101">M101</option>
          <option value="M103">M103</option>
          <option value="M104">M104</option>
          <option value="M105">M105</option>
          <option value="M106">M106</option>
        </select>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={handleAddCourse}
          className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
        >
          <IoAdd className="mr-1" />
          Add Course
        </button>

        <button
          onClick={() => alert('Import function not implemented')}
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          <PiExportBold className="mr-1" />
          Import Course
        </button>
      </div>

      <table className="min-w-full bg-gray-900 border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium uppercase">Module</th>
            <th className="px-6 py-3 text-left text-sm font-medium uppercase">Title</th>
            <th className="px-6 py-3 text-left text-sm font-medium uppercase">Poster</th>
            <th className="px-6 py-3 text-left text-sm font-medium uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.length !== 0 ? filteredCourses.map((course) => (
            <tr key={course.id} className="border-t border-gray-300">
              <td className="px-6 py-4">{course.Module}</td>
              <td className="px-6 py-4">{course.Title}</td>
              <td className="px-6 py-4">
                <img src={course.Poster} alt="Poster" className="w-16 h-16 rounded-lg" />
              </td>
              <td className="px-6 py-4 flex space-x-2">
                <button
                  onClick={() => handleUpdateCourse(course.id)}
                  className="flex bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded"
                >
                  <IoCreate className="mr-2" />
                  Update
                </button>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="flex bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                >
                  <IoTrash className="mr-2" />
                  Delete
                </button>
              </td>
            </tr>
          )) : (
            <tr className="text-center text-lg">
              <td colSpan="4">Course not found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Cours_fetch;
