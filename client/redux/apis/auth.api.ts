import { APP_URL } from "@/constants/config"
import { CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_RESPONSE, FORGET_PASSWORD_REQUEST, FORGET_PASSWORD_RESPONSE, REGISTER_EMPLOYEE_REQUEST, REGISTER_EMPLOYEE_RESPONSE, SEND_OTP_REQUEST, SEND_OTP_RESPONSE, SIGNIN_REQUEST, SIGNIN_RESPONSE, VERIFY_OTP_REQUEST, VERIFY_OTP_RESPONSE } from "@/types/Auth"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { removeStorage, setStorage } from "../utils/authStorage"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `/api/auth`,
        credentials: "include"
    }),
    tagTypes: [],
    endpoints: (builder) => {
        return {

            // signin 
            signin: builder.mutation<SIGNIN_RESPONSE, SIGNIN_REQUEST>({
                query: userData => {
                    return {
                        url: "/signin",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse : (data: SIGNIN_RESPONSE) => {
                    setStorage(data, data.result.role)
                    return data
                }
            }),

            // register employee
            registerEmployee: builder.mutation<REGISTER_EMPLOYEE_RESPONSE, REGISTER_EMPLOYEE_REQUEST>({
                query: userData => {
                    return {
                        url: "/register-employee",
                        method: "POST",
                        body: userData
                    }
                },
            }),

            // signout employee
            signout: builder.mutation<void, void>({
                query: userData => {
                    return {
                        url: "/signout-employee",
                        method: "POST",
                    }
                },
                transformResponse: () => {
                    removeStorage("employee")
                }
            }),

            // signout admin
            signoutAdmin: builder.mutation<void, void>({
                query: userData => {
                    return {
                        url: "/signout-admin",
                        method: "POST",
                    }
                },
                transformResponse: () => {
                    removeStorage("admin")
                }
            }),

            

            // send Otp
            sendOtp: builder.mutation<SEND_OTP_RESPONSE, SEND_OTP_REQUEST>({
                query: userData => {
                    return {
                        url: "/send-otp",
                        method: "POST",
                        body: userData
                    }
                },
            }),

            // verifyOtp 
            verifyOtp: builder.mutation<VERIFY_OTP_RESPONSE, VERIFY_OTP_REQUEST>({
                query: userData => {
                    return {
                        url: "/verify-otp",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: (data: VERIFY_OTP_RESPONSE) => {
                    setStorage(data, data.result.role)
                    return data
                }
            }),
            forgetPassword: builder.mutation<FORGET_PASSWORD_RESPONSE, FORGET_PASSWORD_REQUEST>({
                query: userData => {
                    return {
                        url: "/forget-password",
                        method: "POST",
                        body: userData
                    }
                },
            }),

            // changePassword
            changePassword: builder.mutation<CHANGE_PASSWORD_RESPONSE, CHANGE_PASSWORD_REQUEST>({
                query: userData => {
                    return {
                        url: "/change-password",
                        method: "POST",
                        body: userData
                    }
                },
            }),

        }
    }
})

export const {
    useSigninMutation,
    useRegisterEmployeeMutation,
    useSignoutMutation,
    useSignoutAdminMutation,
    useSendOtpMutation,
    useVerifyOtpMutation,
    useForgetPasswordMutation,
    useChangePasswordMutation
} = authApi
