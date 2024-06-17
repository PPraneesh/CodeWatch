const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createUser = async (req, res) => {
  let user = req.body;
  if (user.userType === "teacher") {
    const teachersCollection = req.app.get("teachersCollection");
    let dbuser = await teachersCollection.findOne({ email: user.email });
    if (dbuser) {
      return res.send({
        message: "User exists",
      });
    }
    user.password = await bcrypt.hash(user.password, 8);
    user = { ...user, testsCreated: [] };
    await teachersCollection.insertOne(user);
    let token = jwt.sign({ email: user.email }, "secret", { expiresIn: "1d" });
    delete user.password;
    return res.send({
      message: "User created and logged in",
      payload: user,
      token,
    });
  } else if (user.userType === "student") {
    const studentsCollection = req.app.get("studentsCollection");
    let dbuser = await studentsCollection.findOne({ email: user.email });
    if (dbuser)
      return res.send({
        message: "User exists",
      });

    user.password = await bcrypt.hash(user.password, 8);
    user = { ...user, testsTaken: [] };
    await studentsCollection.insertOne(user);
    let token = jwt.sign({ email: user.email }, "secret", { expiresIn: "1d" });
    delete user.password;
    return res.send({
      message: "User created and logged in",
      payload: user,
      token,
    });
  } else {
    return res.send({
      message: "what are you trying to do?",
      payload: user,
    });
  }
};

const loginUser = async (req, res) => {
  const userCred = req.body;
  const teachersCollection = req.app.get("teachersCollection");
  const studentsCollection = req.app.get("studentsCollection");

  try {
    if (userCred.userType === "teacher") {
      let dbuser = await teachersCollection.findOne({ email: userCred.email });
      if (!dbuser) {
        return res.send({
          message: "User not found",
        });
      }
      let passwordStatus = await bcrypt.compare(
        userCred.password,
        dbuser.password
      );
      if (!passwordStatus) {
        return res.send({
          message: "Password is incorrect",
        });
      }
      let token = jwt.sign({ email: userCred.email }, "secret", {
        expiresIn: "1d",
      });
      delete dbuser.password;
      res.send({
        message: "Login successfull",
        payload: dbuser,
        token,
      });
    } else if (userCred.userType === "student") {
      let dbuser = await studentsCollection.findOne({ email: userCred.email });
      if (!dbuser) {
        return res.send({
          message: "User not found",
        });
      }
      let passwordStatus = await bcrypt.compare(
        userCred.password,
        dbuser.password
      );
      if (!passwordStatus) {
        return res.send({
          message: "Password is incorrect",
        });
      }
      let token = jwt.sign({ email: userCred.email }, "secret", {
        expiresIn: "1d",
      });
      delete dbuser.password;
      res.send({
        message: "Login successfull",
        payload: dbuser,
        token,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  loginUser,
  createUser,
};
