import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './Cours/Store';
import Cours_fetch from './Cours/Cours_fetch';
import UpdateForm from './Cours/updateForm';
import AddCourse from './Cours/AddCourse';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-900 text-slate-200 flex items-center justify-center">
        <Router>
          <div className="w-full max-w-4xl p-4">
            <Routes>
              <Route path="/" element={<Cours_fetch />} />
              <Route path="/update-course/:id" element={<UpdateForm />} />
              <Route path="/add-course" element={<AddCourse />} />
            </Routes>
          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
