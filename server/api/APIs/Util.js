const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async(req,res)=>{
    const teachersCollection = req.app.get('teachersCollection')
    const studentsCollection = req.app.get('studentsCollection')
    let user = req.body;
    if(user.userType === 'teacher'){
        let dbuser = await teachersCollection.findOne({username:user.username})
        if(dbuser){
            return res.send({
                message:"User already exists"
            })
        }
        user.password = await bcrypt.hash(user.password,8)
        await teachersCollection.insertOne(user)
        res.send({
            message:"User created successfully",
            payload:user
        })
    }else{
        let dbuser = await studentsCollection.findOne({username:user.username})
        if(dbuser){
            return res.send({
                message:"User already exists"
            })
        }
        user.password = await bcrypt.hash(user.password,8)
        await studentsCollection.insertOne(user)
        res.send({
            message:"User created successfully"
        })
    }
}

const loginUser = async(req,res)=>{
    const userCred = req.body;
    const teachersCollection = req.app.get('teachersCollection')
    const studentsCollection = req.app.get('studentsCollection')
    if(userCred.userType=== 'teacher'){
        let dbuser = await teachersCollection.findOne({username:userCred.username})
        if(!dbuser){
            return res.send({
                message:"User not found"
            })
        }
        let passwordStatus = await bcrypt.compare(userCred.password,dbuser.password)
        if(!passwordStatus){
            return res.send({
                message:"Password is incorrect"
            })
        }
        let token = jwt.sign({username: userCred.username},"secret",{expiresIn: '1d'});
        delete dbuser.password;
        res.send({
            message:"Login successful",
            payload:dbuser,
            token
        })
    }
    else if(userCred.userType=== 'student'){
        let dbuser = await studentsCollection.findOne({username:userCred.username})
        if(!dbuser){
            return res.send({
                message:"User not found"
            })
        }
        let passwordStatus = await bcrypt.compare(userCred.password,dbuser.password)
        if(!passwordStatus){
            return res.send({
                message:"Password is incorrect"
            })
        }
        let token = jwt.sign({username: userCred.username},"secret",{expiresIn: '1d'});
        delete dbuser.password;
        res.send({
            message:"Login successful",
            payload:dbuser,
            token
        })
    }
}

module.exports = {
    createUser,
    loginUser
}