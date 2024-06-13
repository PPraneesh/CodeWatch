import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

const AllTests: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [tests, setTests] = useState<any[]>([]);

  
useEffect ( ()=>{  
  const user:any = localStorage.getItem('payload');
  const parsedUser = JSON.parse(user);
  console.log(parsedUser.testsCreated);
  try {
    Promise.all(parsedUser.testsCreated.map(async (test: any) => {
      const res = await axios.get(`https://special-orbit-j6vww6q5qpqhjjq4-5000.app.github.dev/teacher/${username}/tests/${test}`);
      console.log(res.data.payload);  
      return res.data.payload;
    })).then((results) => {
      setTests([...tests, ...results]);
    }).catch((err) => {
      console.log(err);
    });
  } catch (err) {
    console.log(err);
  }
},[])
  return (
    <div className="p-8 pt-10">
      <h1 className="text-4xl">All Tests</h1>
      {
        tests.map((test: any) => {
          return (<Link className='text-black' to={`/${username}/tests/${test.testId}/results`}>
            
            <div key={test?.testId} className="border border-gray-300 p-4 rounded-lg my-4 bg-gray-800 text-white shadow-md shadow-[#f8b739] border-[#f8b739]
             ">
                <h2 className="text-2.xl">{test?.testName}</h2>
                <p className="text-sm"><span className='font-bold text-1.5xl'>Test ID:</span>  {test.testId}</p>
                <p className="text-sm"><span className='font-bold text-1.5xl'>Status:</span>  {test.status}</p>
                <p className="text-sm"><span className='font-bold text-1.5xl'>Language:</span>  {test.language}</p>
                <p className="text-sm"><span className='font-bold text-1.5xl'>No. of Coding Questions:</span>  {test.numCodingQues}</p>
                <p className="text-sm"><span className='font-bold text-1.5xl'>No. of MCQuestions:</span> {test.numMcqs}</p>
              </div>
          </Link>
          );
        })
      }
    </div>
  );
};

export default AllTests;
