import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const AllTests: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const payload = JSON.parse(localStorage.getItem("payload") || "{}");
  const testCodes = payload.testsCreated;

  useEffect(() => {
    const getTests = async () => {
      try {
        setLoading(true);
        const tests = await Promise.all(
          testCodes.map(async (test: any) => {
            const res = await axios.get(
              `/api/teacher/${username}/tests/${test}`
            );
            return res.data.payload;
          })
        );
        setTests(tests);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getTests();
  }, []);

  const handleClick = async (status: string, testId: string) => {
    console.log(status, testId);
  };
  console.log(tests);

  return (
    <div>
      <h1 className="text-4xl">All Tests</h1>
      {tests?.length === 0 && !loading && (
        <>
          <h1 className="text-2xl my-10 ">No tests created yet</h1>
          <Link
            to={`/teacher/${username}/create-test`}
            className="px-4 py-2 bg-black text-yellow-500 rounded-lg "
          >
            {" "}
            Create a Test{" "}
          </Link>
        </>
      )}
      {loading && <h1 className="text-2xl my-10 ">Loading...</h1>}
      {!loading &&
        tests.map((test: any, index: number) => {
          return (
            <div className="text-black" key={index}>
              <div
                key={test?.testId}
                className="border relative p-4 rounded-lg my-4 bg-gray-800 text-white shadow-md shadow-[#f8b739] border-[#f8b739]
             "
              >
                <h2 className="text-2xl uppercase">{test?.testName}</h2>

                <p className="text-lg">
                  <span className="font-bold text-lg">Test ID:</span>{" "}
                  {test.testId}
                </p>

                <p className="text-lg">
                  <span className="font-bold text-lg">Status:</span>{" "}
                  {test.status}
                </p>

                <p className="text-lg">
                  <span className="font-bold text-lg">Language:</span>{" "}
                  {test.language}
                </p>

                <p className="text-lg">
                  <span className="font-bold text-lg">
                    No. of Coding Questions:
                  </span>{" "}
                  {test.numCodingQues}
                </p>

                <p className="text-lg">
                  <span className="font-bold text-lg">No. of MCQuestions:</span>{" "}
                  {test.numMcqs}
                </p>

                {test?.status !== "upcoming" && (
                  <div>
                    <p className="text-sm">
                      <span className="font-bold text-1.5xl min-w-56">
                        Cheaters
                      </span>{" "}
                    </p>
                    {test?.cheaters?.map((cheater: any) => {
                      return (
                        <p className="text-sm">
                          <span className="font-bold text-1.5xl">Email:</span>{" "}
                          {cheater}
                        </p>
                      );
                    })}
                  </div>
                )}

                <div className="absolute right-10 bottom-5">
                  {test.status === "upcoming" && (
                    <button
                      className=" px-4 py-1 bg-green-700 rounded-md text-white"
                      onClick={() => handleClick(test.status, test.testId)}
                    >
                      Start Test
                    </button>
                  )}

                  {test.status === "ongoing" && (
                    <div className="a flex gap-4">
                      <button className="px-4 py-1 bg-yellow-800 rounded-md text-white">
                        <Link
                          to={`/teacher/${username}/tests/${test.testId}/results`}
                        >
                          View Live Results
                        </Link>
                      </button>
                      <button
                        className="px-4 py-1 bg-yellow-800 rounded-md text-white"
                        onClick={() => handleClick(test.status, test.testId)}
                      >
                        End Test
                      </button>
                    </div>
                  )}

                  {test.status === "completed" && (
                    <button
                      className="px-4 py-1 bg-blue-700 rounded-md text-white"
                      onClick={() => handleClick(test.status, test.testId)}
                    >
                      View Results
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default AllTests;
