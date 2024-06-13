import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import SideBar from './components/SideBar';


const Layout: React.FC = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  if(!token) navigate('/login')
    
  return (
    <>
      <div className="w-screen h-screen flex flex-row">
        <div className="w-[20%] h-full">
          <SideBar />
        </div>
        <div className="w-[80%] h-full overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout