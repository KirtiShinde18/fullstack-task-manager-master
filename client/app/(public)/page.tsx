"use client"

import { useSendOtpMutation, useSigninMutation, useVerifyOtpMutation } from '@/redux/apis/auth.api'
import { SEND_OTP_REQUEST, SIGNIN_REQUEST, VERIFY_OTP_REQUEST } from '@/types/Auth'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z, { email } from 'zod'

const Login = () => {
  const [showLoginWithOtp, setShowLoginWithOtp] = useState(false)

  // mutation returns []
  const [signin ,  {isLoading}] = useSigninMutation()
  const router = useRouter()

  const loginSchema = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(1),
  }) satisfies z.ZodType<SIGNIN_REQUEST>

  const {handleSubmit, register, reset, formState: {errors , touchedFields},  } = useForm<SIGNIN_REQUEST>({
    defaultValues: {
      email: "",
      password: ""
    }, resolver: zodResolver(loginSchema)

  })

  const handleLogin = async ( data : SIGNIN_REQUEST ) => {
    try {
      const { result } = await signin(data).unwrap()
      toast.success("Login Success")
      reset()

      if (result.role === "admin"){
        router.push("/admin")
        router.refresh()
      }else {
        router.push("/employee")
        router.refresh()
      }
      
    } catch (error) {
      console.log(error);
      toast.error("unable to Login")
      
    }
  }

  const handleClasses = (key: keyof SIGNIN_REQUEST) => clsx({
    "form-control my-2": true,
    "is-invalid": errors[key],
    "is-valid": touchedFields[key] && !errors[key],
  })

  
  return <>
  {/* .container>.row>.col-sm6.offset-sm-3>.card>.card-header+.card-body */}
  <div className="container my-5">
    <div className="row">
      <div className="col-sm-6 offset-sm-3">
        <div className="card">
          <div className="card-header alert alert-warning">
            <h1>Login</h1>
          </div>
          <div className="card-body">

            {
              showLoginWithOtp
              ? <LoginWithOTP/>
              : <form onSubmit={handleSubmit(handleLogin)}>
                <div>
                  <input {...register("email")} type="email" placeholder='email@example.com' className={handleClasses("email")}/>
                  <div className='invalid-feedback'>{errors && errors.email?.message}</div>
                </div>

                <div>
                  <input {...register("password")} type="password" placeholder='**********' className={handleClasses("password")}/>
                  <div className='invalid-feedback'>{errors && errors.password?.message}</div>
                </div>

                <button disabled= {isLoading} className='btn btn-lg btn-primary mt-2 w-100'>
                  {
                  isLoading
                  ? <span className='spinner spinner-border'></span>
                  : "Login"
                  }
                </button>

            </form>
            }

            
            <hr />

            

            <div className='d-flex justify-content-between'>

              {
                showLoginWithOtp 
                ? <button onClick={e => setShowLoginWithOtp(false)} className='btn btn-link'>Login With Email/Password</button>
                : <button onClick={e => setShowLoginWithOtp(true)} className='btn btn-link'>Login with OTP</button>
              }
              
              <button className='btn btn-link'>Forget Password</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  </>


}

const LoginWithOTP = () => {
  const [showOtp, setShowOtp] = useState(false)


    const router = useRouter()
    const [sendotp,  {isSuccess}] = useSendOtpMutation()
    const [verifyotp] = useVerifyOtpMutation()


    const loginSchema = z.object({
    username: z.string().min(1),
    otp: z.string(),
  }) satisfies z.ZodType<SEND_OTP_REQUEST>

  const {handleSubmit, register, reset, formState: {errors , touchedFields},  } = useForm<SEND_OTP_REQUEST>({
    defaultValues: {
      username: "",
      otp: ""
    }, resolver: zodResolver(loginSchema)

  })

  // send otp 
  const handleSendotp = async (data: SEND_OTP_REQUEST) => {
    try {
      await sendotp(data).unwrap()
      toast.success("otp send success")
      setShowOtp(true)
    } catch (error) {
      console.log(error);
      toast.error("unable to send otp")
      
    }
  }

  // verify otp 
  const handleVerifyotp = async (data: VERIFY_OTP_REQUEST) => {
    try {
      const {result} = await verifyotp(data).unwrap()
      toast.success("otp verify success")
      if(result.role === "admin"){
        router.push("/admin")
        router.refresh()
      }else{
        router.push("/employee")
      }
    } catch (error) {
      console.log(error);
      toast.error("unable to verify otp")
      
    }
  }

  const handleOTP = (data : SEND_OTP_REQUEST ) => {
    if(showOtp){
      handleVerifyotp(data)
    }else {
      handleSendotp(data)
    }
  }

    return <>
    <form onSubmit={handleSubmit(handleOTP)}>

      {
        showOtp
        ? <div>
              <input 
                {...register("otp")} 
                type="text" 
                className='form-control my-2' 
                placeholder='Enter Your OTP' />

              <button type='submit' className='btn btn-primary w-100 btn-lg'>Verify OTP</button>
        </div> 
        : <div>
              <input 
                {...register("username")} 
                type="text" 
                className='form-control my-2' 
                placeholder='Enter Your Email/Mobile' />

              <button type='submit' className='btn btn-primary w-100 btn-lg'>Send OTP</button>
        </div>
      }
      

      
    </form>
    </>
  }

export default Login