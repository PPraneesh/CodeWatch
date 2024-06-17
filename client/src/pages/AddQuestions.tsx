import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import Toast from "../components/Toast";
import QuestionInput from "../components/QuestionInput";
import { useNavigate } from "react-router-dom";

const AddQuestions: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { testId } = useParams<{ testId: string }>();
  const [codingQuestions, setCodingQuestions] = React.useState<any>([]);
  const [mcqs, setMcqs] = React.useState<any>([]);
  const [codingPane, setCodingPane] = React.useState<boolean>(true);
  const [mcqPane, setMcqPane] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const [test, setTest] = React.useState<any>({});

  React.useEffect(() => {
    axios
      .get(`/api/teacher/${username}/create-test/${testId}/add-questions`)
      .then((res) => {
        if (res.data.message === "Test found") {
          setTest(res.data.payload);
          setCodingQuestions(res.data.payload.codingQuestions);
          setMcqs(res.data.payload.mcqs);
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
    <div className="w-full h-full relative p-8 pt-10 flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibo">Add Questions</h1>
        <div className="flex flex-row gap-16 justify-start items-center">
          <h1>Test Name: </h1>
          <p className="px-1 py-1 w-[200px]  border border-gray-300 rounded-sm">
            {test.testName}
          </p>
        </div>
        <div className="flex flex-row gap-16">
          <h1>Duration: </h1>
          <p className="px-1 py-1 w-[200px]  border border-gray-300 rounded-sm">
            {test.duration}
          </p>
        </div>
        <div className="flex flex-row gap-16">
          <h1>Time: </h1>
          <p className="px-1 py-1 w-[200px]  border border-gray-300 rounded-sm">
            {test.examTime}
          </p>
        </div>
        <div className="flex flex-row gap-16">
          <h1>Language: </h1>
          <p className="px-1 py-1 w-[200px]  border border-gray-300 rounded-sm">
            {test.language}
          </p>
        </div>
        <div className="flex flex-row gap-16">
          <h1>Number of Coding questions: </h1>
          <p className="px-1 py-1 w-[200px]  border border-gray-300 rounded-sm">
            {test.numCodingQues}
          </p>
        </div>
        <div className="flex flex-row gap-16">
          <h1>Number of MCQs: </h1>
          <p className="px-1 py-1 min-w-[200px]  border border-gray-300 rounded-sm">
            {test.numMcqs}
          </p>
        </div>
        <div className="flex flex-row gap-16">
          <h1>Teacher: </h1>
          <p className="px-1 py-1 w-[200px]  border border-gray-300 rounded-sm">
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
                className="w-full p-4 bg-blue-200 border border-black/20 "
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
            className="bg-blue-700 text-white px-4 mt-4 mb-4 py-1 "
          >
            Add Question
          </button>
        )}
      </div>

      <div>
        <h1 className="text-xl mb-2">MCQs</h1>
        <div>
          {mcqs.map((question: any, index: number) => {
            return (
              <div
                key={index}
                className="w-full p-4 bg-blue-200 border border-black/20"
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
            className="bg-blue-700 text-white px-4 py-1 "
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
        className="w-1/4 px-4 py-2 bg-blue-600 text-white rounded-md active:text-black active:bg-white border border-black/40"
      >
        Create Test
      </button>
    </div>
  );
};

export default AddQuestions;
