const express = require("express");
const studentApp = express.Router();

studentApp.use((req,res,next)=>{
    teachersCollection = req.app.get('teachersCollection')
    studentsCollection = req.app.get('studentsCollection')
    testsCollection = req.app.get('testsCollection')
    resultsCollection = req.app.get('resultsCollection')
    next()
})



studentApp.get("/:username",async (req,res)=>{
    const username = req.params.username;
    let user = await studentsCollection.findOne({username:username})
    res.send({
        message:"All details of students",
        payload : user
    })
})

// studentApp.get('/:username/test/:id',async (req,res)=>{
//     const username = req.params.username;
//     const testId = req.params.id;
//     let test = await testsCollection.findOne({testId:testId})
    
    
// })

module.exports = studentApp;