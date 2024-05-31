import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

interface FormData {
  name?: string;
  email: string;
  password: string;
  userType: string;
}

const Login: React.FC = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search);
  const initialLogin = searchParams.get('login') !== 'false';

  const [login, setLogin] = useState<boolean>(initialLogin);
  const [userType, setUserType] = useState<string>('student');
  const { register, handleSubmit } = useForm<FormData>();

  const navigate = useNavigate()

  const handleFormSubmit: SubmitHandler<FormData> = async (data) => {
    const url = `http://localhost:3001/${login ? "login" : "register"}`;

    try {
      const res = await axios.post(url, { ...data, userType });
      console.log(res.data);
      if (res.data.message === "User exists") {
        alert('User already exists');
      }
      else if (res.data.message === "User created") {
        alert('User created');
        navigate('/student/:id');
      }
      else if(res.data.message === "User not found"){
        alert('User not found');
      }
      else if(res.data.message === "Password is incorrect"){
        alert('Incorrect password');
      }
      else if (res.data.message === "Login successfull"){
        alert('Login successfull');
        navigate('/student/:id');
      }
    } 
    
    catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='w-full h-full flex flex-row '>
      <div className='w-1/2 bg-blue-900'>
        <h1 className='text-7xl text-white m-auto '>Code Watch</h1>
      </div>

      <div className='w-1/2 px-24 mt-16 mb-auto'>
        <h1 className='text-5xl font-semibold text-gray-700 text-center'> {login ? "Login" : "Register"} </h1>
        <p className='text-xl text-gray-600 text-center'>{login ? "Welcome Back" : "Create a New Account"}</p>
        <form onSubmit={handleSubmit(handleFormSubmit)} className='mt-8 px-14 py-10 bg-blue-200 rounded-lg flex flex-col gap-4'>
          {!login && (
            <div>
              <label className="block text-gray-700 text-lg font-semibold mb-2">Full Name</label>
              <input
                type="text"
                className='w-full px-3 py-2 bg-transparent text-gray-700 border-2 border-black/40 focus:border-blue-800 focus:border-2 focus:outline-none rounded-lg'
                placeholder='Enter Full Name'
                {...register('name')}
              />
            </div>
          )}
          <div>
            <label className="block text-gray-700 text-lg font-bold mb-2">Email Address</label>
            <input
              type="email"
              className='w-full px-3 py-2 bg-transparent text-gray-700 border-2 border-black/40 focus:border-blue-800 focus:border-2 focus:outline-none rounded-lg'
              placeholder='Enter email'
              required
              {...register('email')}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-lg font-bold mb-2">Password</label>
            <input
              type="password"
              className='w-full px-3 py-2 bg-transparent text-gray-700 border-2 border-black/40 focus:border-blue-800 focus:border-2 focus:outline-none rounded-lg'
              placeholder='Enter password'
              required
              {...register('password')}
            />
          </div>
          <div className='w-full'>
            <label className="block text-gray-700 text-lg font-bold mb-2">User Type</label>
            <div className='flex flex-row gap-4'>
              <div
                className={`w-1/2 px-4 py-2 rounded-lg text-center cursor-pointer ${userType === 'student' ? 'bg-blue-700 text-white' : 'bg-white text-black'}`}
                onClick={() => setUserType('student')}
              >
                Student
              </div>
              <div
                className={`w-1/2 px-4 py-2 rounded-lg text-center cursor-pointer ${userType === 'teacher' ? 'bg-blue-700 text-white' : 'bg-white text-black'}`}
                onClick={() => setUserType('teacher')}
              >
                Teacher
              </div>
            </div>
          </div>

          <button type='submit' className='px-4 py-2 mt-4 bg-blue-600 text-white rounded'>
            {login ? "Login" : "Register"}
          </button>
        </form>
        <button onClick={() => setLogin(!login)}>
          {login ? (
            <>Don't have an account? <span className="underline">Sign up</span></>
          ) : (
            <>Already have an account? <span className="underline">Sign in</span></>
          )}
        </button>
      </div>
    </div>
  );
}

export default Login;
