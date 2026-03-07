"use client"
import { useSignoutAdminMutation } from '@/redux/apis/auth.api'
import { useAppSelector } from '@/redux/store'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import React from 'react'
import { toast } from 'react-toastify'

const AdminNavbar = () => {

  const { admin } = useAppSelector( state => state.auth)
  const [logout] = useSignoutAdminMutation()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      toast.success("logout success")
      router.refresh()
    } catch (error) {
      console.log(error);
      toast.error("unable to logout")
      
    }
  }

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
        admin && <div className="dropdown" >
          <button className='btn btn-light' data-bs-toggle="dropdown" >Welcome {admin.name}</button>
          <div className="dropdown-menu">
            <li className='dropdown-item'> <Link className='nav-link' href="/admin/profile">Profile</Link> </li>
            <li className='dropdown-item'> <Link className='nav-link' href="/admin/setting">Setting</Link> </li>
            <li className='dropdown-item'> <button onClick={handleLogout} className='btn btn-link text-danger'> Logout </button> </li>
          </div>
        </div>
      }
    </div>
  </nav>
  </>
}

export default AdminNavbar