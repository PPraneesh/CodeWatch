const express = require("express");
const teacherApi = express.Router();
import {createUser,loginUser} from './Util'

teacherApi.use((req,res,next)=>{
    const teachersCollection = app.get('teachersCollection')
    const studentsCollection = app.get('studentsCollection')
    const testsCollection = app.get('testsCollection')
    const resultsCollection = app.get('resultsCollection')
    next()
})

teacherApi.post("/login",loginUser)
teacherApi.post("/register",createUser)

teacherApi.get("/:username",async (req,res)=>{
    const username = req.params.username;
    let user = await teachersCollection.findOne({username:username})
    res.send({
        message:"All details of students",
        payload : user
    })
})