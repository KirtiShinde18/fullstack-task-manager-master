"use client"

import { useDeleteEmployeeMutation, useGetEmployeesQuery, useRemoveEmployeeMutation, useRestoreEmployeeMutation, useToggleEmployeeStatusMutation } from '@/redux/apis/admin.api'
import { useRegisterEmployeeMutation } from '@/redux/apis/auth.api'
import { DELETE_EMPLOYEE_REQUEST, REMOVE_EMPLOYEE_REQUEST, RESTORE_EMPLOYEE_REQUEST, TOGGLE_EMPLOYEE_REQUEST } from '@/types/Admin'
import { REGISTER_EMPLOYEE_REQUEST } from '@/types/Auth'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'

const AdminEmployee = () => {
  const [selectedEmp, setSelectedEmp] = useState("")
  const { data } = useGetEmployeesQuery()
  const [restoreEmp , {isLoading : restoreLoading}] = useRestoreEmployeeMutation()
  const [deleteEmp , {isLoading : deleteLoading}] = useDeleteEmployeeMutation()
  // permanant delete 
  const [removeEmp, {isLoading: removeLoading}] = useRemoveEmployeeMutation()
  // mutation return array []
  const [registerEmployee, {isLoading}] = useRegisterEmployeeMutation()
  // toggle 
  const [toggle] = useToggleEmployeeStatusMutation()

  const registerSchema = z.object({
    name : z.string().min(1),
    email : z.string().min(1),
    mobile : z.string().min(1),
  }) satisfies z.ZodType<REGISTER_EMPLOYEE_REQUEST>

  const {handleSubmit, register, reset, formState: {errors}} = useForm<REGISTER_EMPLOYEE_REQUEST>({
    defaultValues : {
      name : "",
      email : "",
      mobile : "",
    }, resolver : zodResolver(registerSchema)
  })

  // register
  const handleRegister = async (data : REGISTER_EMPLOYEE_REQUEST ) => {
    try {
      await registerEmployee(data).unwrap()
      toast.success("register success")
      reset()
    } catch (error) {
      console.log(error);
      toast.error("unable to Register employee")
    }
  }

  // classes
  const handleClasses = (key: keyof REGISTER_EMPLOYEE_REQUEST ) => clsx({
      "form-control my-2": true,
      "is-invalid": errors && errors[key],
      "is-valid": errors && !errors[key],
    })

  //restore
  const handleRestore = async (data : RESTORE_EMPLOYEE_REQUEST) => {
      try {
        await restoreEmp(data).unwrap()
        toast.success("employee account restore success")
      } catch (error) {
        console.log(error);
        toast.error("Unable to restore")
        
      }
    }

  // delete 
  const handleDelete = async (data : DELETE_EMPLOYEE_REQUEST) => {
      try {
        await deleteEmp(data).unwrap()
        toast.success("employee account delete success")
      } catch (error) {
        console.log(error);
        toast.error("Unable to delete")
        
      }
    }

    // permanant delete 
    const handleRemove = async (data : REMOVE_EMPLOYEE_REQUEST ) => {
      try {
        await removeEmp(data).unwrap()
        toast.success("employee account delete success")
      } catch (error) {
        console.log(error);
        toast.error("Unable to delete")
        
      }
    }

    // Toggle Status 
    const handleToggle = async (data: TOGGLE_EMPLOYEE_REQUEST) => {
        try {
            await toggle(data).unwrap()
            toast.success("employe status update success")
        } catch (error) {
            console.log(error)
            toast.error("unable to change status")
        }
    }


  // bg color
  const handleBgColor = (active: boolean, isDelete: boolean) => clsx({
    "table-success" : active && !isDelete,
    "table-secondary" : !active && !isDelete, 
    "table-danger" : isDelete,
  })
  return <>
  <div className="container">
    {/* <h1>Empoyee Register form goes here</h1> */}


    {/* Task start  */}

    <div className="container my-5">
      <div className="row">
        <div className="col-sm-6 offset-sm-3">
          <div className="card">
            <div className="card-header alert alert-warning">
              <h1>Employee Register</h1> 
            </div>
            <div className="card-body">

              <form onSubmit={handleSubmit(handleRegister)}>

                <div>
                  <input {...register("name")} type="text" placeholder='Enter Your name' className={handleClasses("name")}/>
                  <div className='invalid-feedback'>{errors && errors.name?.message}</div>
                </div>

                <div>
                  <input {...register("email")} type="email" placeholder='email@example.com' className={handleClasses("email")}/>
                  <div className='invalid-feedback'>{errors && errors.email?.message}</div>
                </div>

                <div>
                  <input {...register("mobile")} type="number" placeholder='Enter Your Mobile No' className={handleClasses("mobile")}/>
                  <div className='invalid-feedback'>{errors && errors.mobile?.message}</div>
                </div>

                <button type="submit" disabled={isLoading} className='btn btn-lg btn-primary mt-2 w-100'>
                  {isLoading ? "Registering..." : "Register"}
                </button>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Task end */}

    {
      data && <table className='table table-bordered table-hover'>
        <thead>
          <tr>
            <th>id</th>  
            <th>name</th>
            <th>email</th>
            <th>mobile</th>
            <th>role</th>
            <th>active</th>
            <th>isDelete</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {
            data.result.map(item => <tr key={item._id}  // or any unique identifier
              className={handleBgColor(item.active, item.isDelete)}
            >
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.mobile}</td>
              <td>{item.role}</td>
              <td>
                {
                  item.active
                      ? <button onClick={e => handleToggle({ _id: item._id, status: false })} className='btn btn-sm btn-outline-danger'>block</button>
                      : <button onClick={e => handleToggle({ _id: item._id, status: true })} className='btn btn-sm btn-success'>un block</button>
                }
              </td>
              <td>{item.isDelete ? "Yes" :"No"}</td>
              <td>
                {
                  item.isDelete
                  ?  <div>
                    {/* restore btn  */}
                    <button 
                        disabled={restoreLoading}
                        onClick={() => handleRestore({_id: item._id, isDelete : false})} 
                        className='btn btn-sm btn-warning'>
                          {
                            restoreLoading
                            ? <div className='spinner spinner-border-sm'></div>
                            : "Restore"
                          }
                    </button>

                    {/* permanant delete  */}
                    <button onClick={e => setSelectedEmp(item._id)} data-bs-toggle="modal" data-bs-target="#deleteModal" className='ms-2 btn btn-sm btn-danger'>Permanant Delete</button>

                  </div>

                  : <div>
                    <button className='btn btn-sm btn-outline-warning me-2'>
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button disabled={deleteLoading} onClick={e => handleDelete({_id : item._id})} className='btn btn-sm btn-outline-danger me-2'>
                      {
                        deleteLoading
                        ? <div className='spinner spinner-border-sm'></div>
                        : <i className="bi bi-trash"></i>
                      }
                    </button>

                    
                  </div>
                }
                
              </td>
            </tr> )
          }
        </tbody>
      </table>
    }
  </div>

  {/* modal start */}
  {/* .modal>.modal-dialog>.modal-content>.modal-header+.modal-body */}
  <div className="modal fade" id='deleteModal'>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header alert alert-danger">
          <h1>Confirm Permanant deletation 🗑️</h1>
        </div>
        <div className="modal-body">
          <h6 className='text-danger'>You are about to permanatly delete this employee.. 
            This action cannot be undone. Do you wish to continue
          </h6>

          <div className='text-end mt-3'>
            <button onClick={e => handleRemove({ _id: selectedEmp})} data-bs-dismiss="modal" className='btn btn-outline-danger'>Yes, Delete</button>
            <button data-bs-dismiss="modal" className='btn btn-outline-success ms-2'>Cancel</button>
          </div>

        </div>
      </div>
    </div>
  </div>
  {/* modal end */}
  </>
}

export default AdminEmployee