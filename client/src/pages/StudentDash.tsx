import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const StudentDash: React.FC = () => {
  let { username } = useParams()
  const navigate = useNavigate()

  const [userData, setUserData] = useState<any>(null)
  // const [tests, setTests] = useState<any>(null)

  useEffect(() => {
    axios.get(`http://localhost:3001/student/${username}`)
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
    <div>StudentDash</div>
  )
}

export default StudentDash