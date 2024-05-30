const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const createUser = async (req, res) => {

    let user = req.body;
    if (user.userType === 'teacher') {
        const teachersCollection = req.app.get('teachersCollection')
        let dbuser = await teachersCollection.findOne({ email: user.email })
        if (dbuser) {
            return res.send({
                message: "User already exists"
            })
        }
        user.password = bcrypt.hash(user.password, process.env.SALT)
        user = { ...user, testsCreated: [] }
        await teachersCollection.insertOne(user)
        return res.send({
            message: "User created successfully",
            payload: user
        })
    }

    else if (user.userType === 'student') {
        const studentsCollection = req.app.get('studentsCollection')
        let dbuser = await studentsCollection.findOne({ username: user.username })
        if (dbuser) {
            return res.send({
                message: "User already exists"
            })
        }
        user.password = await bcrypt.hash(user.password, process.env.SALT)
        user = { ...user, testsTaken: [] }
        await studentsCollection.insertOne(user)
        res.send({
            message: "User created successfully",
            payload: user
        })
    }
}

const loginUser = async (req, res) => {
    const userCred = req.body;
    const teachersCollection = req.app.get('teachersCollection')
    const studentsCollection = req.app.get('studentsCollection')
    if (userCred.userType === 'teacher') {
        let dbuser = await teachersCollection.findOne({ username: userCred.username })
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
        let token = jwt.sign({ username: userCred.username }, "secret", { expiresIn: '1d' });
        delete dbuser.password;
        res.send({
            message: "Login successful",
            payload: dbuser,
            token
        })
    }
    else if (userCred.userType === 'student') {
        let dbuser = await studentsCollection.findOne({ username: userCred.username })
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
        let token = jwt.sign({ username: userCred.username }, "secret", { expiresIn: '1d' });
        delete dbuser.password;
        res.send({
            message: "Login successful",
            payload: dbuser,
            token
        })
    }
}

module.exports = {
    loginUser,
    createUser
}