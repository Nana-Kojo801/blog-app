
import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='auth-layout'>
        <div className="leftside">
            <h1>Welcome to Nana's Blog App</h1>
            <h3>Where you can blog till your hearts content</h3>
        </div>
        <div className="rightside">
            <Outlet />
        </div>
    </div>
  )
}

export default AuthLayout