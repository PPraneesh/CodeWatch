import React from 'react'
import {Outlet} from 'react-router-dom'


const Layout: React.FC = () => {
  return (
    <div className='w-screen h-screen'>
        <Outlet />
    </div>
  )
}

export default Layout