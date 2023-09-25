import React from 'react'
import { Outlet } from 'react-router-dom'
import "../style/management/management.css"
const Management = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default Management