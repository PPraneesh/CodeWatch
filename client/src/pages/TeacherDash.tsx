import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const TeacherDash: React.FC = () => {
  const { username } = useParams<{ username: string }>()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    axios.get(`http://localhost:3001/teacher/${username + "@gmail.com"}`)
      .then(res => {
        if (res.data.message === "Teacher not found")
          return
        else if (res.data.message === "Teacher found")
          setUser(res.data.payload)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  console.log(user)
  return (
    <div>TeacherDash
    </div>

  )
}

export default TeacherDash