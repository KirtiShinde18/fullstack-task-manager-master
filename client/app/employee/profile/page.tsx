"use client"
import { useGetProfileQuery } from '@/redux/apis/employee.api'
import React from 'react'

const EmployeeProfile = () => {
  const { data } = useGetProfileQuery()
  return <>
  <div className="container">

    {
      data && <div className="container">
        <div className="card">
          <div className="card-heade alert alert-danger">
            <h1>My Profile 👱🏻‍♀️</h1>
          </div>
          <div className="card-body">
            <div>Name : {data.result.name} </div>
            <div>Email : {data.result.email} </div>
            <div>mobile : {data.result.mobile} </div>
            <div>Profile : {data.result.profilePic} </div>
            <div>Account : {data.result.active ? "Active" : "InActive"} </div>
          </div>
        </div>
      </div>
    }
  </div>
  </>
}

export default EmployeeProfile