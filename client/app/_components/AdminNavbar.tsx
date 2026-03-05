"use client"
import { useAppSelector } from '@/redux/store'
import Link from 'next/link'
import React from 'react'

const AdminNavbar = () => {

  const { admin } = useAppSelector( state => state.auth)

  return <>
  <nav className="navbar navbar-expand-lg alert alert-primary">
    <div className="container-fluid">
      <Link className="navbar-brand" href="#">Admin Panel</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link className="nav-link active" href="/admin">Dashboard</Link>
          <Link className="nav-link" href="/admin/employee">Employee</Link>
          <Link className="nav-link" href="/admin/todo">Todos</Link>
        </div>
      </div>

      {
        admin && <div className="dropdown" data-bs-toggle="dropdown">
          <button className='btn btn-light'>Welcome {admin.name}</button>
          <div className="dropdown-menu">
            <li className='dropdown-item'> <Link className='nav-link' href="/admin/profile">Profile</Link> </li>
            <li className='dropdown-item'> <Link className='nav-link' href="/admin/setting">Setting</Link> </li>
            <li className='dropdown-item'> <button className='btn btn-link text-danger'> Logout </button> </li>
          </div>
        </div>
      }
    </div>
  </nav>
  </>
}

export default AdminNavbar