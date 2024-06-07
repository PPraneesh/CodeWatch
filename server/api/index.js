const express = require("express");
const app = express();
const { createUser, loginUser } = require("./APIs/Util")
const mongoClient = require("mongodb").MongoClient;

const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(cors())

mongoClient.connect(process.env.MONGODB_URI)
    .then(client => {
        const db = client.db('codeWatch')
        const teachersCollection = db.collection('teachers')
        const studentsCollection = db.collection('students')
        const testsCollection = db.collection('tests')
        const resultsCollection = db.collection('results')
        const codingQuestionsCollection = db.collection('codingQuestions')
        const mcqQuestionsCollection = db.collection('mcqQuestions')

        app.set('teachersCollection', teachersCollection)
        app.set('studentsCollection', studentsCollection)
        app.set('testsCollection', testsCollection)
        app.set('resultsCollection', resultsCollection)
        app.set('codingQuestionsCollection', codingQuestionsCollection)
        app.set('mcqQuestionsCollection', mcqQuestionsCollection)
        console.log('Connected to Database')
    })
    .catch((err) => {
        console.error(err)
    })

const studentApp = require("./APIs/studentApi")
const teacherApp = require("./APIs/teacherApi");


app.use('/student', studentApp)
app.use('/teacher', teacherApp)
app.use('/login', loginUser)
app.use('/register', createUser)

app.get("/", (req, res) => {
    res.send("You found the server of CodeWatch! don't mess with it!")
})

app.use((err, req, res, next) => {
    res.send({
        error: err.message
    })
})
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});