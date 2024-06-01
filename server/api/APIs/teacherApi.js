const express = require("express");
const teacherApp = express.Router();


teacherApp.use((req,res,next)=>{
    teachersCollection = req.app.get('teachersCollection')
    studentsCollection = req.app.get('studentsCollection')
    testsCollection = req.app.get('testsCollection')
    resultsCollection = req.app.get('resultsCollection')
    next()
})


teacherApp.get("/:username",async (req,res)=>{
    const username = req.params.username;
    console.log(username)
    const user = await teachersCollection.findOne({email : username})
    if(!user){
        return res.send({
            message:"Teacher not found"
        })
    }
    res.send({
        message:"Teacher found",
        payload : user
    })
})

module.exports = teacherApp;
