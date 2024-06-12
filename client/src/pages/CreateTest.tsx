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
    await axios.post(`https://special-orbit-j6vww6q5qpqhjjq4-5000.app.github.dev/teacher/${username}/create-test`, testDetails)
      .then((res) => {
        console.log(res.data)
        if (res.data.message === 'Test created') {
          Toast.Success("Test created successfully")
          console.log(res.data.payload)
          navigate(`/teacher/${username}/create-test/${res.data.payload.testId}/add-questions`)
        }
        else if (res.data.message === 'Test not created') {
          Toast.Error("Error creating test")
        }
      })
      .catch((err) => {
        console.log(err);
        Toast.Error('Error creating test, please login again')
      });
  };

  return (
    <form onSubmit={handleSubmit(handleCreateTest)} className='h-full w-full p-8 flex flex-col pt-10 gap-8'>
      <h1 className='text-4xl'>Create Test</h1>

      <div className='flex flex-row gap-16 justify-start items-center'>
        <h1>Test name :</h1>
        <input
          type="text"
          required
          {...register('testName')}
          className='border border-black rounded-sm px-2 py-1 w-1/4'
        />
      </div>

      <div className='flex flex-row gap-16 items-center justify-start'>
        <h1>Time of Examination</h1>
        <input
          type="time"
          required
          {...register('examTime')}
          className='border border-black rounded-sm px-2 py-1'
        />
      </div>

      <div className='flex flex-row gap-16'>
        <h1>Duration of Test in minutes</h1>
        <input
          type="number"
          required
          {...register('duration')}
          className='border border-black rounded-sm px-2 py-1 w-1/4'
        />
      </div>

      <div className='flex flex-row gap-16'>
        <h1>Date of Test </h1>
        <input
          type="date"
          required
          {...register('date')}
          className='border border-black rounded-sm px-2 py-1 w-1/4'
        />
      </div>

      

      <div className='flex flex-row gap-16 items-center justify-start'>
        <h1>Specific language</h1>
        <select
          required
          {...register('language')}
          className='border border-black rounded-sm px-2 py-1 w-1/4'
        >
          <option value="any">Any</option>
          <option value="C++">C++</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
        </select>
      </div>

      <div className='flex flex-row gap-16 items-center justify-start'>
        <h1>Number of coding questions</h1>
        <input
          type="number"
          required
          {...register('numCodingQues')}
          className='border border-black rounded-sm px-2 py-1 w-1/4'
        />
      </div>

      <div className='flex flex-row gap-16 items-center justify-start'>
        <h1>Number of mcqs</h1>
        <input
          type="number"
          required
          {...register('numMcqs')}
          className='border border-black rounded-sm px-2 py-1 w-1/4'
        />
      </div>

      <button type='submit' className='w-1/4 mt-4 bg-blue-700 px-6 py-2 rounded-lg text-white'>
        Create Test
      </button>
    </form>
  );
};

export default CreateTest;
