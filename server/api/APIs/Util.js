const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const createUser = async (req, res) => {

    let user = req.body;
    console.log(user)
    if (user.userType === 'teacher') {
        const teachersCollection = req.app.get('teachersCollection')
        let dbuser = await teachersCollection.findOne({ email: user.email })
        if (dbuser) {
            return res.send({
                message: "User exists"
            })
        }
        user.password = await bcrypt.hash(user.password, 8)
        user = { ...user, testsCreated: [] }
        console.log(user)
        await teachersCollection.insertOne(user)
        return res.send({
            message: "User created",
            payload: user
        })
    }
    else if (user.userType === 'student') {
        const studentsCollection = req.app.get('studentsCollection')
        let dbuser = await studentsCollection.findOne({ email: user.email })
        if (dbuser) 
            return res.send({
                message: "User exists"
            })
        
        user.password = await bcrypt.hash(user.password, 8)
        user = { ...user, testsTaken: [] }
        console.log(user)
        await studentsCollection.insertOne(user)
        return res.send({
            message: "User created",
            payload: user
        })
    }
}

const loginUser = async (req, res) => {
    const userCred = req.body;
    const teachersCollection = req.app.get('teachersCollection')
    const studentsCollection = req.app.get('studentsCollection')
    if (userCred.userType === 'teacher') {
        let dbuser = await teachersCollection.findOne({ email: userCred.email })
        console.log(dbuser)
        if (!dbuser) {
            return res.send({
                message: "User not found"
            })
        }
        let passwordStatus = await bcrypt.compare(userCred.password, dbuser.password)
        console.log(passwordStatus)
        if (!passwordStatus) {
            return res.send({
                message: "Password is incorrect"
            })
        }
        let token = jwt.sign({ email: userCred.email }, "secret", { expiresIn: '1d' });
        delete dbuser.password;
        res.send({
            message: "Login successfull",
            payload: dbuser,
            token
        })
    }
    else if (userCred.userType === 'student') {
        let dbuser = await studentsCollection.findOne({ email: userCred.email })
        if (!dbuser) {
            return res.send({
                message: "User not found"
            })
        }
        let passwordStatus = await bcrypt.compare(userCred.password, dbuser.password)
        if (!passwordStatus) {
            return res.send({
                message: "Password is incorrect"
            })
        }
        let token = jwt.sign({ email: userCred.email }, "secret", { expiresIn: '1d' });
        delete dbuser.password;
        res.send({
            message: "Login successfull",
            payload: dbuser,
            token
        })
    }
}

module.exports = {
    loginUser,
    createUser
}