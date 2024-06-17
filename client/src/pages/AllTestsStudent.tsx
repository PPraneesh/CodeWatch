import axios from 'axios';
import React, { useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'

const AllTestsStudent: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const [tests, setTests] = useState<any[]>([]);
    useEffect(()=>{
        axios.get(`/api/student/${username}/results`)
        .then(res=>{
            setTests(res.data.payload)
            console.log(res.data.payload)
        })
    },[])
  return (<>
    <div className="p-8 pt-10">
      <h1 className="text-4xl">All Tests</h1>
      {
        tests.map((test: any) => {
          return (
            <div key={test?.test} className="border p-4 rounded-lg my-4 bg-gray-800 text-white shadow-md shadow-[#f8b739] border-[#f8b739]
             ">
                <h2 className="text-2.xl">{test?.testName}</h2>
                <p className="text-sm"><span className='font-bold text-1.5xl'>Test ID:</span>  {test.test}</p>
                <p className="text-sm"><span className='font-bold text-1.5xl'>Status:</span>  {test.status}</p>
                <p className="text-sm"><span className='font-bold text-1.5xl'>Language:</span>  {test.language}</p>
                <p className="text-sm"><span className='font-bold text-1.5xl'>No. of Coding Questions:</span>  {test.score?.codingScore}</p>
                <p className="text-sm"><span className='font-bold text-1.5xl'>No. of MCQuestions:</span> {test.score?.mcqScore}</p>
              </div>
          );
        })
      }
    </div>
  </>)
}

export default AllTestsStudent