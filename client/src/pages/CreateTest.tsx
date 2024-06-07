import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import { useForm } from 'react-hook-form';


const CreateTest: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const payload = JSON.parse(localStorage.getItem('payload') || '{}');
  const username = payload.email?.split('@')[0];

  const handleCreateTest = async (data: any) => {
    const { testName, examTime, duration, language, numCodingQues, numMcqs } = data;
    const testDetails = {
      testName,
      examTime,
      duration,
      language,
      numCodingQues,
      numMcqs,
      codingQuestions: [],
      mcqs: [],
      status: false //private
    };

    // console.log(testDetails);
    await axios.post(`http://localhost:3001/teacher/${username}/create-test`, testDetails)
      .then((res) => {
        console.log(res.data)
        if(res.data.message === 'Test created'){
          Toast.Success("Test created successfully")
          console.log(res.data.payload)
          navigate(`/teacher/${username}/create-test/${res.data.payload.testId}/add-questions`)
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

  return (
    <form onSubmit={handleSubmit(handleCreateTest)} className='h-full w-full p-8'>
      <h1 className='text-4xl '>Create Test</h1>
      <div>
        <h1>Test name</h1>
        <input
          type="text"
          placeholder='Enter Test Name'
          required
          {...register('testName')}
        />
      </div>

      <div>
        <h1>Time of Examination</h1>
        <input
          type="time"
          required
          {...register('examTime')}
        />
      </div>

      <div>
        <h1>Duration of Test in minutes</h1>
        <input
          type="number"        
          required
          {...register('duration')}
        />
      </div>

      <div>
        <h1>Specific language</h1>
        <select        
          required
          {...register('language')}
        >
          <option value="any">Any</option>
          <option value="C++">C++</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
        </select>
      </div>

      <div>
        <h1>Number of coding questions</h1>
        <input
          type="number"
          required
          {...register('numCodingQues')}
        />
      </div>

      <div>
        <h1>Number of mcqs</h1>
        <input
          type="number"
          required
          {...register('numMcqs')}
        />
      </div>

      <button type='submit' className='mt-4 bg-black px-6 py-2 rounded-lg text-white'>
        Create Test
      </button>
    </form>
  );
};

export default CreateTest;
