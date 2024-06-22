import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import Toast from "../components/Toast";
import QuestionInput from "../components/QuestionInput";
import { useNavigate } from "react-router-dom";

const AddQuestions: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { testId } = useParams<{ testId: string }>();
  const [codingQuestions, setCodingQuestions] = React.useState<any>([
    {
      constraints: "1≤𝑇≤100 1≤𝑁≤ * 10^5 1≤𝑎𝑖≤2",
      description:
        "Step into a world of mystery and intrigue at a glamorous masquerade ball where secrets are unveiled under the cover of night.",
      difficulty: "5",
      input: "56",
      output: "NO YES",
      question:
        "Leo has already won the Ballon d'Or 8 times, so he is really impressed with it (is he?). Leo has an array 𝐴 A containing 𝑁 N integers. Each element of this array is either 1 1 or 2 2. He wants to figure out if the product of all the elements of the array can be written as an 8-th power of some integer, i.e, 𝑘^8 for some integer",
      testInput: "2 1 2",
      testOutput: "NO YES",
    },
    {
      constraints: "1≤𝑇≤100 1≤𝑁≤ * 10^5 1≤𝑎𝑖≤2",
      description:
        "Step into a world of mystery and intrigue at a glamorous masquerade ball where secrets are unveiled under the cover of night.",
      difficulty: "5",
      input: "56",
      output: "NO YES",
      question:
        "Leo has already won the Ballon d'Or 8 times, so he is really impressed with it (is he?). Leo has an array 𝐴 A containing 𝑁 N integers. Each element of this array is either 1 1 or 2 2. He wants to figure out if the product of all the elements of the array can be written as an 8-th power of some integer, i.e, 𝑘^8 for some integer",
      testInput: "2 1 2",
      testOutput: "NO YES",
    },
  ]);
  const [mcqs, setMcqs] = React.useState<any>([
    {
      correctOption: "2",
      difficulty: "5",
      options: ["1", "2", "3", "4"],
      question:
        "Leo has already won the Ballon d'Or 8 times, so he is really impressed with it (is he?). Leo has an array 𝐴 A containing 𝑁 N integers. Each element of this array is either 1 1 or 2 2. He wants to figure out if the product of all the elements of the array can be written as an 8-th power of some integer, i.e, 𝑘^8 for some integer",
    },
    {
      correctOption: "2",
      difficulty: "5",
      options: ["1", "2", "3", "4"],
      question:
        "Leo has already won the Ballon d'Or 8 times, so he is really impressed with it (is he?). Leo has an array 𝐴 A containing 𝑁 N integers. Each element of this array is either 1 1 or 2 2. He wants to figure out if the product of all the elements of the array can be written as an 8-th power of some integer, i.e, 𝑘^8 for some integer",
    },
  ]);
  const [codingPane, setCodingPane] = React.useState<boolean>(false);
  const [mcqPane, setMcqPane] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const [test, setTest] = React.useState<any>({});
  console.log(codingQuestions, mcqs);

  React.useEffect(() => {
    axios
      .get(`/api/teacher/${username}/create-test/${testId}/add-questions`)
      .then((res) => {
        if (res.data.message === "Test found") {
          setTest(res.data.payload);
          // setCodingQuestions(res.data.payload.codingQuestions);
          // setMcqs(res.data.payload.mcqs);
        } else {
          console.log("Test not found");
          Toast.Error("Error Occured");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddCoding = () => {
    setMcqPane(false);
    setCodingPane(!codingPane);
  };

  const handleAddMcq = () => {
    setCodingPane(false);
    setMcqPane(!mcqPane);
  };

  const handleCreateTest = async () => {
    const questions = {
      codingQuestions,
      mcqs,
    };

    if (
      questions.codingQuestions.length < test.numCodingQues ||
      questions.mcqs.length < test.numMcqs
    ) {
      Toast.Info("Please add all questions");
      return;
    }

    await axios
      .post(`/api/teacher/${username}/create-test/${testId}/add-questions`, {
        questions,
      })
      .then((res) => {
        if (res.data.message === "Questions added") {
          Toast.Success("Questions added successfully");
        } else if (res.data.message === "Questions not added") {
          Toast.Error("Error adding questions");
        } else {
          Toast.Error("Some error occured, Try again later");
        }
      })
      .catch((err) => {
        console.log(err);
        Toast.Error("Error adding questions, please login again");
      });

    navigate(`/teacher/${username}/tests`);
  };

  return (
    <div className="w-full relative flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl">Add Questions</h1>
        <div className="flex flex-row gap-16 justify-start items-center">
          <h1 className="font-semibold min-w-56">Test Name: </h1>
          <p className="px-4 py-1 w-[200px]  border border-gray-300 rounded-sm">
            {test.testName}
          </p>
        </div>
        <div className="flex flex-row gap-16">
          <h1 className="font-semibold min-w-56">Duration: </h1>
          <p className="px-4 py-1 w-[200px]  border border-gray-300 rounded-sm">
            {test.duration}
          </p>
        </div>
        <div className="flex flex-row gap-16">
          <h1 className="font-semibold min-w-56">Time: </h1>
          <p className="px-4 py-1 w-[200px]  border border-gray-300 rounded-sm">
            {test.examTime}
          </p>
        </div>
        <div className="flex flex-row gap-16">
          <h1 className="font-semibold min-w-56">Language: </h1>
          <p className="px-4 py-1 w-[200px]  border border-gray-300 rounded-sm">
            {test.language}
          </p>
        </div>
        <div className="flex flex-row gap-16">
          <h1 className="font-semibold min-w-56">
            Number of Coding questions:{" "}
          </h1>
          <p className="px-4 py-1 w-[200px]  border border-gray-300 rounded-sm">
            {test.numCodingQues}
          </p>
        </div>
        <div className="flex flex-row gap-16">
          <h1 className="font-semibold min-w-56">Number of MCQs: </h1>
          <p className="px-4 py-1 min-w-[200px]  border border-gray-300 rounded-sm">
            {test.numMcqs}
          </p>
        </div>
        <div className="flex flex-row gap-16">
          <h1 className="font-semibold min-w-56">Teacher: </h1>
          <p className="px-4 py-1 w-[200px]  border border-gray-300 rounded-sm">
            {test.email?.split("@")[0]}
          </p>
        </div>
      </div>

      <div>
        <h1 className="text-xl mb-2">Coding Questions:</h1>
        <div className="w-full flex flex-col items-center gap-4 ">
          {codingQuestions.map((question: any, index: number) => {
            return (
              <div
                key={index}
                className="w-full p-4 bg-black text-white  "
              >
                <h1>{question.question}</h1>
                <h1>{question.difficulty}</h1>
                <h1>{question.testCases}</h1>
                <h1>{question.constraints}</h1>
                <h1>{question.input}</h1>
                <h1>{question.output}</h1>
              </div>
            );
          })}
        </div>

        {codingQuestions.length < test.numCodingQues && (
          <button
            onClick={handleAddCoding}
            className="bg-black text-yellow-400 px-4 mt-4 mb-4 py-1 "
          >
            Add Question
          </button>
        )}
      </div>

      <div>
        <h1 className="text-xl mb-2">MCQs</h1>
        <div className="w-full flex flex-col items-center gap-4">
          {mcqs.map((question: any, index: number) => {
            return (
              <div
                key={index}
                className="w-full p-4 bg-black text-white"
              >
                <h1>{question.question}</h1>
                <h1>{question.difficulty}</h1>
                <h1>{question.options}</h1>
                <h1>{question.correctOption}</h1>
              </div>
            );
          })}
        </div>

        {mcqs.length < test.numMcqs && (
          <button
            onClick={handleAddMcq}
            className="bg-black text-yellow-400 px-4 mt-4 mb-4 py-1 "
          >
            Add Question
          </button>
        )}
      </div>

      {(codingPane || mcqPane) && (
        <QuestionInput
          qtype={codingPane}
          setCodingQuestions={setCodingQuestions}
          setMcqs={setMcqs}
          setCodingPane={setCodingPane}
          setMcqPane={setMcqPane}
        />
      )}

      <button
        onClick={handleCreateTest}
        className="w-40 px-4 py-2 bg-black  text-yellow-400 rounded-md active:text-black active:bg-white border border-black/40"
      >
        Create Test
      </button>
    </div>
  );
};

export default AddQuestions;