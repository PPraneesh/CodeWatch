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
    let user = await teachersCollection.findOne({username:username})
    res.send({
        message:"All details of students",
        payload : user
    })
})

module.exports = teacherApp;
