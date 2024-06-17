import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import StudentPerf from '../components/StudentPerf'


const StudentDash: React.FC = () => {
  let { username } = useParams()

  const [userData, setUserData] = useState<any>(null)
  // const [tests, setTests] = useState<any>(null)

  useEffect(() => {
    axios.get(`/api/student/${username}`)
      .then(res => {
        if (res.data.message === "User not found")
          // navigate('/login')
          console.log("User not found")
        else if (res.data.message === "All details of student")
          setUserData(res.data.payload)
      })
  }, [])

  //get tests data
  console.log(userData)
  
  return (
    <div>
        <div>
        <h1 className='text-4xl  p-8 text-black'>Your Performance</h1>
        <StudentPerf /> {/* Render the PerformanceChart component */}
      </div>
    </div>
  )
}

export default StudentDash