import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './components/SideBar';


const Layout: React.FC = () => {
  return (
    <>
      <div className="w-screen h-screen flex flex-row">
        <div className="w-[20%] h-full">
          <SideBar />
        </div>
        <div className="w-[80%] h-full">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout