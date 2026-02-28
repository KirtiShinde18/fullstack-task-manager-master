const { getAllEmployees, updateEmployees, toggleEmployeeStatus, deleteEmployee, createTask, readTask, updateTask, deleteTask, restoreEmployee, permanantDeleteEmployee } = require("../controllers/admin.controller.js")
const { adminProtect } = require("../middlewares/auth.middlewares")

const router = require("express").Router()

router
    .get("/employee", getAllEmployees)
    .put("/update-employee/:eid", updateEmployees)
    .put("/update-employee-status/:eid", toggleEmployeeStatus)
    .delete("/delete-employee/:eid", deleteEmployee)
    .put("/restore-employee/:eid", restoreEmployee)
    .delete("/remove-employee/:eid", permanantDeleteEmployee)

    .post("/todo-create", createTask)
    .get("/todo", readTask)
    .put("/todo/:tid", updateTask)
    .delete("/todo/:tid", deleteTask)
    

module.exports = router