"use client"
import { useGetProfileQuery, useUpdateProfileMutation } from '@/redux/apis/employee.api'
import { UPDATE_PROFILE_REQUEST } from '@/types/Employee'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'

const EmployeeProfile = () => {
  const { data } = useGetProfileQuery()
  const [ updateProfile ] = useUpdateProfileMutation()

  const profileSchema = z.object({
          _id: z.string().min(1),
          name: z.string().min(1),
          email: z.string().min(1),
          mobile: z.string().min(1),
      }) satisfies z.ZodType<UPDATE_PROFILE_REQUEST>
  
      const { register, reset, handleSubmit, formState: { errors, dirtyFields } } = useForm<UPDATE_PROFILE_REQUEST>({
          resolver: zodResolver(profileSchema),
          defaultValues: {
              _id: "",
              name: "",
              email: "",
              mobile: "",
  
          },
  
      })

      const handleUpdate = async (data : UPDATE_PROFILE_REQUEST) => {
        try {
          await updateProfile(data).unwrap()
        } catch (error) {
          console.log(error);
          toast.error("unable to update ")
        }
      }
      
  return <>
  <div className="container">

    {
      data && <div className="container">
        <div className="card">
          <div className="card-header alert alert-danger d-flex justify-content-between align-item-center">
            <h1>My Profile 👱🏻‍♀️</h1>

            <button onClick={e => reset(data.result)} data-bs-toggle="modal" data-bs-target="#editProfile" className='btn btn-warning'> <i className="bi bi-pencil"></i> </button>

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

    {/* modal start  */}
    <div className="modal fade" id='editProfile'>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header alert alert-danger">
            <h1 className="modal-title">Profile Edit</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(handleUpdate)}>
              <div>
                <input {...register("name")} type="text" className='form-control my-3' />
                <div className='invalid-feedback'></div>
              </div>

              <div>
                <input {...register("email")} type="text" className='form-control my-3' />
                <div className='invalid-feedback'></div>
              </div>

              <div>
                <input {...register("mobile")} type="text" className='form-control my-3' />
                <div className='invalid-feedback'></div>
              </div>

              <button  data-bs-dismiss="modal" type='submit' className='btn btn-warning w-100 btn-lg'>Update Profile</button>

            </form>
          </div>

        </div>
      </div>
    </div>
    {/* modal end */}
  </div>
  </>
}

export default EmployeeProfile