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
    let user = await studentsCollection.findOne({email : username + "@gmail.com"})
    if(!user)
        return res.send({message:"User not found"})
    return res.send({
        message:"All details of student",
        payload : user
    })
})

// studentApp.get('/:username/test/:id',async (req,res)=>{
//     const username = req.params.username;
//     const testId = req.params.id;
//     let test = await testsCollection.findOne({testId:testId})
    
    
// })

module.exports = studentApp;