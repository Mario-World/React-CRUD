import React from 'react'

const Navbar = () => {
  return (
  <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
  
    <a className="btn btn-ghost text-xl">CRUDUI</a>
  </div>
  <div className="navbar-center">
  <div className = "flex-none gap-2">
  <input type="text" placeholder="Search" className ="input input-bordered w-48 md:w-auto" />
  </div>
  
  </div>
  <div className="navbar-end">
    <a className="btn btn-primary">Button</a>
  </div>
</div>
  )
}

export default Navbar;