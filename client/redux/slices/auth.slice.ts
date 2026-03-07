// srtslice 

import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../apis/auth.api";
import { SIGNIN_RESPONSE } from "@/types/Auth";
import { getStorage } from "../utils/authStorage";

type authType  = {
    admin : {
        name : string,
        email: string,
        _id: string,
        mobile: string,
        role : string,
        profilePic : string
    } | null,
    
    employee : {
        name : string,
        email: string,
        _id: string,
        mobile: string,
        role : string,
        profilePic : string
    } | null
}
const initialState : authType = {
    admin : getStorage("admin"),
    employee: getStorage("employee")
}

const authSlice= createSlice({
    name: "authSlice",
    initialState ,
    reducers: {
     
    },
    extraReducers: builder => builder
        // signin
        .addMatcher(authApi.endpoints.signin.matchFulfilled, (state, { payload }) => {
            if(payload.result.role === "admin"){
                state.admin = payload.result
                
            }else{
                state.employee = payload.result
                
            }
        })

        // verifyotp
        .addMatcher(authApi.endpoints.verifyOtp.matchFulfilled, (state, { payload }) => {
            if(payload.result.role === "admin"){
                state.admin = payload.result
                
            }else{
                state.employee = payload.result
                
            }
        })

        //signout
        .addMatcher(authApi.endpoints.signout.matchFulfilled, (state, { payload }) => {
            state.employee = null
        })

        .addMatcher(authApi.endpoints.signoutAdmin.matchFulfilled, (state, { payload }) => {
            state.admin = null
        })
     
       
})

// export const { invalidate } = authSlice.actions
export default authSlice.reducer