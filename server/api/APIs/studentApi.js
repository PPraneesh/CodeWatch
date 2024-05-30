const express = require("express");
const studentApp = express.Router();
import {createUser,loginUser} from './Util'

studentApp.use((req,res,next)=>{
    const teachersCollection = app.get('teachersCollection')
    const studentsCollection = app.get('studentsCollection')
    const testsCollection = app.get('testsCollection')
    const resultsCollection = app.get('resultsCollection')
    next()
})

studentApp.post("/login",loginUser)
studentApp.post("/register",createUser)

studentApp.get("/:username",async (req,res)=>{
    const username = req.params.username;
    let user = await studentsCollection.findOne({username:username})
    res.send({
        message:"All details of students",
        payload : user
    })
})

