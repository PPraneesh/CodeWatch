const express = require("express");
const studentApp = express.Router();

studentApp.use((req, res, next) => {
  teachersCollection = req.app.get("teachersCollection");
  studentsCollection = req.app.get("studentsCollection");
  testsCollection = req.app.get("testsCollection");
  resultsCollection = req.app.get("resultsCollection");
  codingQuestionsCollection = req.app.get("codingQuestionsCollection");
  mcqQuestionsCollection = req.app.get("mcqQuestionsCollection");
  next();
});

const checkStatus = async (token) => {
    const options = {
        method: "GET",
        url: "https://judge0-ce.p.rapidapi.com/submissions" + "/" + token,
        params: { base64_encoded: "true", fields: "*" },
        headers: {
            "X-RapidAPI-Host": process.env.JUDGE0_RAPID_API_HOST,
            "X-RapidAPI-Key": process.env.JUDGE0_RAPID_API_KEY,
        },
    };
    try {
        let response = await axios.request(options);
        let statusId = response.data.status?.id;
        if (statusId === 1 || statusId === 2) {
            setTimeout(() => {
                checkStatus(token)
            }, 5000)
            return 
        } else {
            console.log('response.data ', response.data)
            return response.data;
        }
    } catch (err) {
        console.log("err ", err);
        return { message: "Internal Server Error" };
    }
};

// here we sent all details abt student incl his test results
studentApp.get("/:username", async (req, res) => {
  const username = req.params.username;
  let user = await studentsCollection.findOne({
    email: username + "@gmail.com",
  });
  if (!user) return res.send({ message: "User not found" });
  return res.send({
    message: "All details of student",
    payload: user,
  });
});

// here we sent all details abt test, if its upcoming we will send all the meta deta abt test
// if its ongoing we will only send the test ongoing message
// if its previous we will send the results of the test
studentApp.post("/:username/test/:testId", async (req, res) => {
  const testId = req.params.testId;
  const test = await testsCollection.findOne({ testId: testId });
  if (!test) return res.send({ message: "Test not found" });
  if (test.status === "completed") {
    return res.send({
      message: "Test has ended, in frontend redirect to /results/:testId",
    });
  } else if (test.status === "ongoing") {
    return res.send({
      message: "Test is going on",
      payload: test,
    });
  } else if (test.status === "upcoming") {
    delete test.codingQuestions;
    delete test.mcqs;
    return res.send({
      message: "Test is upcoming",
      payload: test,
    });
  } else {
    return res.send({
      message: "Test not found",
    });
  }
});
studentApp.get("/:username/test/:testId/c/:qId", async (req, res) => {
  const { username, testId, qId } = req.params;
  const test = await testsCollection.findOne({ testId: testId });
  if (!test) return res.send({ message: "Test not found" });
  if (test.status !== "ongoing")
    return res.send({ message: "Test not ongoing" });
  const question = await codingQuestionsCollection.findOne({ questionId: qId });
  if (!question) return res.send({ message: "Question not found" });
  return res.send({
    message: "Question found",
    payload: question,
  });
});

studentApp.get("/:username/test/:testId/m/:qId", async (req, res) => {
  const { username, testId, qId } = req.params;
  const test = await testsCollection.findOne({ testId: testId });
  if (!test) return res.send({ message: "Test not found" });
  if (test.status !== "ongoing")
    return res.send({ message: "Test not ongoing" });
  const question = await mcqQuestionsCollection.findOne({ questionId: qId });
  if (!question) return res.send({ message: "Question not found" });
  return res.send({
    message: "Question found",
    payload: question,
  });
});

studentApp.post("/:username/test/:testId/c/:qId/run", async (req, res) => {
  const { username, testId, qId } = req.params;

  const { code, customInput } = req.body;
  const test = await testsCollection.findOne({ testId: testId });
  const lang = test.language;
  const langOpt = [
    { value: "C++", label: "C++", id: 54 },
    { value: "javascript", label: "javascript", id: 63 },
    { value: "Java", label: "Java", id: 62 },
  ];
    const langId = langOpt.find((l) => l.value === lang).id;

  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Host": process.env.JUDGE0_RAPID_API_HOST,
      "X-RapidAPI-Key": process.env.JUDGE0_RAPID_API_KEY,
    },
    data: {
      language_id: langId,
      source_code: btoa(code),
      stdin: btoa(customInput),
    },
  };
  try {
    const response = await axios.request(options);
    console.log("token", response.data);
    const token = response.data.token;

    setTimeout(async () => {
      const result = await checkStatus(token);
      console.log(result);
      res.send(result);
    }, 5000);
  } catch (error) {
    console.error(error);
    return res.send({ message: "Internal Server Error" });
  }
});
studentApp.post("/:username/test/:testId/c/:qId/submit", async (req, res) => {
    const { lang, code, problemId } = req.body;
    const problem = problems.find(p => p.problemId === problemId);
    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {
            base64_encoded: 'true',
            fields: '*'
        },
        headers: {
            'content-type': 'application/json',
            'Content-Type': 'application/json',
            "X-RapidAPI-Host": process.env.JUDGE0_RAPID_API_HOST,
            "X-RapidAPI-Key": process.env.JUDGE0_RAPID_API_KEY,
        },
        data: {
            language_id: lang,
            source_code: btoa(code),
            stdin: btoa(problem.testInput),
            expected_output: btoa(problem.testOutput),
        }
    };
    try {
        const response = await axios.request(options);
        console.log("token", response.data);
        const token = response.data.token;
        

        setTimeout(async() => {
            const result =  await checkStatus(token)
            console.log(result)
            res.send(result)
        }, 5000)
        

    } catch (error) {
        console.error(error);
        return res.send({ message: "Internal Server Error" });
    }
});
studentApp.get("/:username/results", async (req, res) => {
  const username = req.params.username;
  const email = username + "@gmail.com";
  const student = await studentsCollection.findOne({ email: email });
  if (!student) return res.send({ message: "Student not found" });
  const results = student.testsInfo;
  return res.send({
    message: "All results of student",
    payload: results,
  });
});

studentApp.get("/:username/results/:testId", async (req, res) => {
  const { username, testId } = req.params;
  const email = username + "@gmail.com";
  try {
    const student = await studentsCollection.findOne({ email: email });

    if (!student) return res.send({ message: "Student not found" });
    const result = student.testsInfo.find((t) => t.testId === testId);

    if (!result) return res.send({ message: "Result not found" });
    return res.send({
      message: "Result found",
      payload: result,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = studentApp;