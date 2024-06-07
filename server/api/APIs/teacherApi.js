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
    const user = await teachersCollection.findOne({ email: username })
    console.log(user)
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

function testCodeGen() {
    let code = ""
    const alpha = "abcdefghijklmnopqrstuvwxyz"

    for (let i = 0; i < 5; i++) {
        code += alpha[Math.floor(Math.random() * alpha.length)]
    }
    return code
}

teacherApp.post("/:username/create-test", async (req, res) => {
    const username = req.params.username;
    const testData = req.body;
    const testCode = testCodeGen();
    const test = {
        testId: testCode,
        teacher: username,
        ...testData,
    };

    console.log("Test Data to be inserted:", test);

    try {
        const result = await testsCollection.insertOne(test);

        if (result.acknowledged) {
            await teachersCollection.updateOne({email: username + "@gmail.com"}, {$push: {testsCreated: testCode}});
            return res.send({
                message: "Test created",
                payload: test
            });
        } else {
            console.log("Test insert failed:", result);
            return res.send({
                message: "Test not created"
            });
        }
    } catch (err) {
        console.error("Error inserting test:", err);
        return res.send({
            message: "Test not created"
        });
    }
});

teacherApp.get('/:username/create-test/:testId/add-questions', async (req, res) => {
    const username = req.params.username;
    const testId = req.params.testId;
    const test = await testsCollection.findOne({ testId: testId });

    if (test) {
        return res.send({
            message: "Test found",
            payload: test
        });
    }

    return res.send({
        message: "Test not found"
    });

});


module.exports = teacherApp;
