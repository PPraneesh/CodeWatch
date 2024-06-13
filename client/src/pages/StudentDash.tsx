import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import StudentPerf from '../components/StudentPerf'



//dashboard
// /* App.js */
//import CanvasJSReact from '@canvasjs/react-charts';

const StudentDash: React.FC = () => {
  let { username } = useParams()
  const navigate = useNavigate()

  const [userData, setUserData] = useState<any>(null)
  // const [tests, setTests] = useState<any>(null)

  useEffect(() => {
    axios.get(`https://special-orbit-j6vww6q5qpqhjjq4-5000.app.github.dev/student/${username}`)
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