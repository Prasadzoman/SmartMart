import React from 'react'
import logo from '../icons/logo.png';

function index() {
  return (
    <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="h-10" />
          <h1 className="text-xl font-bold">Smart Bazar</h1>
        </div>
  )
}

export default index