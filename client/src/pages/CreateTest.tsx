import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';

const CreateTest: React.FC = () => {
  const [testName, setTestName] = useState('');
  const [examTime, setExamTime] = useState('');
  const [duration, setDuration] = useState('');
  const [language, setLanguage] = useState('any');
  const navigate = useNavigate();
  const payload = JSON.parse(localStorage.getItem('payload') || '{}');
  const username = payload.email?.split('@')[0];

  const handleSubmit = async () => {
    const testDetails = {
      testName,
      examTime,
      duration,
      language,
    };

    await axios.post(`http://localhost:3001/teacher/${username}/create-test`, testDetails)
      .then((res) => {
        console.log(res.data)
        if(res.data.message === 'Test created'){
          console.log(res.data.payload)
        }
        else if(res.data.message === 'Test not created'){
          Toast.Error("Error creating test")
        }
      })
      .catch((err) => {
        console.log(err);
        Toast.Error('Error creating test, please login again')
      });
  };
  //num of coding ques and num of mcqs

  return (
    <div className='h-full w-full p-8'>
      <div>
        <h1>Test name</h1>
        <input
          type="text"
          placeholder='Enter Test Name'
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          required
        />
      </div>

      <div>
        <h1>Time of Examination</h1>
        <input
          type="time"
          value={examTime}
          onChange={(e) => setExamTime(e.target.value)}
          required
        />
      </div>

      <div>
        <h1>Duration of Test in minutes</h1>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </div>

      <div>
        <h1>Specific language</h1>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          required
        >
          <option value="any">Any</option>
          <option value="C++">C++</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
        </select>
      </div>

      <button onClick={handleSubmit} className='mt-4 bg-black px-6 py-2 rounded-lg text-white'>
        Create Test
      </button>
    </div>
  );
};

export default CreateTest;
