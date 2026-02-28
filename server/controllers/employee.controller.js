const Task = require("../models/Task");
const User = require("../models/User");

// get
exports.getAllTodos = async ( req , res) => {
    try {
        //                                             👇🏻 from auth.middleware.js protect function (id of logg)
        const result = await Task.find( { employee: req.user})
        res.status(200).json({message : "todo fetch success", result})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Unable to fetch todos"})
        
    }
}

// toggle status 
exports.toggleTodoStatus = async ( req , res) => {
    try {
        const {tid} = req.params
        const { complete } = req.body
        await Task.findByIdAndUpdate(tid, {complete, completeDate: new Date()}, {runValidators: true})
        res.status(200).json({message : "todo toggle status success"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Unable to toggle status todos"})
        
    }
}

// get profile
exports.getProfile = async ( req , res) => {
    try {
        
        const result = await User.findById(req.user).select("name email mobile role profilePic")
        res.status(200).json({ message : "profile fetch success", result })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Unable to fetch profile" })
        
    }
}

// update profile
exports.updateProfile = async ( req , res) => {
    try {
        // const { eid } = req.params
        const { name , email, mobile, } = req.body
        const body = {}
        if(name) body.name = name
        if(email) body.email = email
        if(mobile) body.mobile = mobile

        await User.findByIdAndUpdate(req.user, body, { runValidators: true })
        res.status(200).json({ message : "profile update success" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Unable to update profile" })
        
    }
}