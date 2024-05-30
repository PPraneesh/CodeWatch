import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import TeacherDash from './pages/TeacherDash';
import StudentDash from './pages/StudentDash';
import CreateTest from './pages/CreateTest';
import Test from './pages/Test';
import TestResult from './pages/TestResult';
import PrevTests from './pages/PrevTests';


interface User {
  username: string
  role: string
}

const App: React.FC = () => {
  const [user, setUser] = useState<User>(
    JSON.parse(localStorage.getItem('user'))
  )


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/teacher/:username" element={<TeacherDash />} />
          <Route path="/teacher/:username/create-test" element={<CreateTest />} />
          <Route path="/teacher/:username/prev-tests" element={<PrevTests />} />
          <Route path="/teacher/:username/test/:id" element={<Test />} />  

          <Route path="/student/:username" element={<StudentDash />} />
          <Route path="/student/:username/test/:id" element={<Test />} />
          <Route path="/student/:username/test-result/:id" element={<TestResult />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
