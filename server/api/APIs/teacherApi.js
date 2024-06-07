const express = require("express");
const teacherApp = express.Router();


teacherApp.use((req, res, next) => {
    teachersCollection = req.app.get('teachersCollection')
    studentsCollection = req.app.get('studentsCollection')
    testsCollection = req.app.get('testsCollection')
    resultsCollection = req.app.get('resultsCollection')
    codingQuestionsCollection = req.app.get('codingQuestionsCollection')
    mcqQuestionsCollection = req.app.get('mcqQuestionsCollection')
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

function GenCode() {
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
    const testCode = GenCode();
    const test = {
        testId: testCode,
        teacher: username,
        ...testData,
    };

    console.log("Test Data to be inserted:", test);

    try {
        const result = await testsCollection.insertOne(test);

        if (result.acknowledged) {
            await teachersCollection.updateOne({ email: username + "@gmail.com" }, { $push: { testsCreated: testCode } });
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

teacherApp.post('/:username/create-test/:testId/add-questions', async (req, res) => {
    const username = req.params.username;
    const testId = req.params.testId;
    const codingQuestions = req.body.questions.codingQuestions;
    const mcqQuestions = req.body.questions.mcqs;
    const test = await testsCollection.findOne({ testId: testId });

    if (!test) {
        return res.send({
            message: "Test not found"
        });
    }

    //create a id for each question , store coding qs in codingQuestionsCollection and mcq qs in mcqQuestionsCollection
    // then store the ids in test collecion
    try {

        for (let i = 0; i < codingQuestions.length; i++) {
            const question = {
                ...codingQuestions[i],
                questionId: GenCode()
            };
            console.log(question)
            await codingQuestionsCollection.insertOne(question);
            await testsCollection.updateOne({ testId: testId }, { $push: { codingQuestions: question.questionId } });
        }

        for (let i = 0; i < mcqQuestions.length; i++) {
            const question = {
                ...mcqQuestions[i],
                questionId: GenCode()
            };
            console.log(question)
            await mcqQuestionsCollection.insertOne(question);
            await testsCollection.updateOne({ testId: testId }, { $push: { mcqQuestions: question.questionId } });
        }
        res.send({ message: "Questions added" })
    }
    catch (err) {
        console.log(err)
        return res.send({ message: "Questions not added" })
    }



});

module.exports = teacherApp;
