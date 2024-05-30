const express = require("express");
const app = express();
const mongoClient = require("mongodb").MongoClient;
const path = require('path');
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(cors())

mongoClient.connect(process.env.MONGODB_URI)
.then(client=>{
    const db = client.db('codeWatch')
    const teachersCollection = db.collection('teachers')
    const studentsCollection = db.collection('students')
    const testsCollection = db.collection('tests')
    const resultsCollection = db.collection('results')

    app.set('teachersCollection', teachersCollection)
    app.set('studentsCollection', studentsCollection)
    app.set('testsCollection', testsCollection)
    app.set('resultsCollection', resultsCollection)
    console.log('Connected to Database')
})
.catch((err)=>{
    console.error(err)
})

const studentApp = require("./APIs/studentApi")
const teacherApp = require("./APIs/teacherApi");
const { error } = require("console");

app.use('/student', studentApp)
app.use('/teacher', teacherApp)


app.get("/",(req,res)=>{
    res.send("You found the server of CodeWatch! don't mess with it!")
})

app.use((err,req,res,next)=>{
    res.send({
        error: err.message
    })
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});