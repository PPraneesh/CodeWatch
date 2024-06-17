import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import Toast from '../components/Toast';

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

  // useEffect(()=>{
  //   const token = localStorage.getItem('token')
  //   //validate token
  //   //use axios with token and use verify token middleware in server

  //   if(token){
  //     const payload = localStorage.getItem('payload')
  //     console.log(payload)
  //     if(payload){
  //       const userType = JSON.parse(payload).userType
  //       const email = JSON.parse(payload).email
  //       const username = email.split('@')[0]
  //       navigate(`/${userType}/${username}`)
  //     }
  //   }
  // }, [])


  const handleFormSubmit: SubmitHandler<FormData> = async (data) => {
    const url = login ? "/api/login" : "/api/register";

    try {
      const res = await axios.post(url, { ...data, userType });
      if (res.data.message === "User exists") {
        Toast.Error('User exists');
      }
      else if (res.data.message === "User not found") {
        Toast.Error('User not found');
      }
      else if (res.data.message === "Password is incorrect") {
        Toast.Error('Password is incorrect');
      }
      else if (res.data.message === "Login successfull" || res.data.message === "User created and logged in") {
        if (res.data.message === "Login successfull")
          Toast.Success('Login successfull');
        else Toast.Success('Account Created')
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('payload', JSON.stringify(res.data.payload))
        const email = res.data.payload.email
        const userType = res.data.payload.userType
        //split email to 2 parts
        const username = email.split('@')[0]
        if (userType === 'student') {
          navigate(`/student/${username}`)
        }
        else if (userType === 'teacher') {
          navigate(`/teacher/${username}`)
        }
      }
    }

    catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='w-full min-h-screen flex flex-row bg-gray-200'>
      <div className="relative w-7/12">
        <video
          autoPlay
          loop
          muted
          playsInline 
          className="absolute top-0 left-0 w-full h-full object-cover z-0" style={{ filter: 'grayscale(100%)'}}
        >
          <source src="https://hrcdn.net/fcore/assets/onboarding/globe-5fdfa9a0f4.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 flex justify-center items-center h-full">
          <h1 className="text-7xl text-white">Code <span className="text-[#f8b739]">Watch</span></h1>
        </div>
      </div>


      <div className='w-5/12 px-24 mt-8 mb-auto'>
      <p className='text-2xl text-black text-center'>{login ? "Welcome Back!" : "Create a New Account"}</p>
        <h1 className='text-3xl font-semibold text-black text-center'> {login ? "Login to your account" : "Register"} </h1>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className='mt-8 px-14 py-10 bg-black rounded-lg flex flex-col gap-4'>
          {!login && (
            <div>
              <label className="block text-lg font-semibold mb-2 text-gray-200">Full Name</label>
              <input
                type="text"
                className='w-full px-3 py-2 bg-gray-800 text-white border-2 border-black/40 focus:border-[#f8b739] focus:border-2 focus:outline-none rounded-lg '
                placeholder='Enter Full Name'
                {...register('name')}
              />
            </div>
          )}
          <div>
            <label className="block text-white text-lg font-bold mb-2 ">Email Address</label>
            <input
              type="email"
              className='w-full px-3 py-2  border-2 border-black/40 focus:border-[#f8b739] focus:border-2 focus:outline-none rounded-lg bg-gray-800 text-white'
              placeholder='Enter email'
              required
              {...register('email')}
            />
          </div>
          <div>
            <label className="block text-white text-lg font-bold mb-2  ">Password</label>
            <input
              type="password"
              className='w-full px-3 py-2  border-2 border-black/40 focus:border-
               focus:border-[#f8b739] focus:outline-none rounded-lg bg-gray-800 text-white'
              placeholder='Enter password'
              required
              {...register('password')}
            />
          </div>
          <div className='w-full'>
            <label className="block text-white text-lg font-bold mb-2">User Type</label>
            <div className='flex flex-row gap-4'>
              <div
                className={`w-1/2 px-4 py-2 rounded-lg text-center cursor-pointer ${userType === 'student' ? 'bg-[#f8b739] ' : 'bg-gray-800 text-white'}`}
                onClick={() => setUserType('student')}
              >
                Student
              </div>
              <div
                className={`w-1/2 px-4 py-2 rounded-lg text-center cursor-pointer ${userType === 'teacher' ? 'bg-[#f8b739]' : 'bg-gray-800 text-white'}`}
                onClick={() => setUserType('teacher')}
              >
                Teacher
              </div>
            </div>
          </div>

          <button type='submit' className='px-4 py-2 mt-4 bg-[#f8b739] rounded active:bg-white active:text-black'>
            {login ? "Login" : "Register"}
          </button>
        </form>
        
        <div className="m-5">
        <button onClick={() => setLogin(!login)}>
          {login ? (
            <>Don't have an account? <span className="underline">Sign up</span></>
          ) : (
            <>Already have an account? <span className="underline">Sign in</span></>
          )}
        </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
