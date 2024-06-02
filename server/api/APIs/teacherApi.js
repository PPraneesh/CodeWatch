const express = require("express");
const teacherApp = express.Router();


teacherApp.use((req, res, next) => {
    teachersCollection = req.app.get('teachersCollection')
    studentsCollection = req.app.get('studentsCollection')
    testsCollection = req.app.get('testsCollection')
    resultsCollection = req.app.get('resultsCollection')
    next()
})


teacherApp.get("/:username", async (req, res) => {
    const username = req.params.username;
    console.log(username)
    const user = await teachersCollection.findOne({ email: username })
    if (!user) {
        return res.send({
            message: "Teacher not found"
        })
    }
    res.send({
        message: "Teacher found",
        payload: user
    })
})

function testCodeGen(){
    let code = ""
    const alpha = "abcdefghijklmnopqrstuvwxyz"

    for(let i = 0; i < 5; i++){
        code += alpha[Math.floor(Math.random() * alpha.length)]
    }
    return code
}

teacherApp.post("/:username/create-test", async (req, res) => {
    const username = req.params.username;
    const testData = req.body
    const testCode = testCodeGen()
    const test = {
        ...testData,
        testId: testCode,
        teacher: username
    }

    console.log(test)
    const result = await testsCollection.insertOne(test)
    if (result.insertedCount > 0) {
        return res.send({
            message: "Test created",
            payload: test
        })
    }
    res.send({
        message: "Test not created"
    })

})

module.exports = teacherApp;
