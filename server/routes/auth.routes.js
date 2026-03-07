const { singin, registerEmployee, sendOTP, verifyOTP, forgetPassword, changePassword, signoutEmployee, signoutAdmin } = require("../controllers/auth.controller")
const { adminProtect, protect } = require("../middlewares/auth.middlewares")

const router = require("express").Router()

router
    .post("/signin", singin)
    .post("/register-employee", adminProtect, registerEmployee)
    .post("/signout-employee",protect("employee"), signoutEmployee)
    .post("/signout-admin",protect("admin"), signoutAdmin)
    .post("/send-otp", sendOTP)
    .post("/verify-otp", verifyOTP)
    .post("/forget-password", forgetPassword)
    .post("/change-password", changePassword)

module.exports = router