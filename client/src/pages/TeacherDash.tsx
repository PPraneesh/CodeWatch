import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PerformanceChart from "../components/PerformanceChart";

const TeacherDash: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/teacher/${username + "@gmail.com"}`)
      .then((res) => {
        if (res.data.message === "Teacher not found") return;
        else if (res.data.message === "Teacher found")
          setUser(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(user);
  return (
    <div className="h-full w-full flex flex-col gap-4 ">
      <h1 className="text-4xl">Dashboard</h1>
      <div>
        <h1 className="text-2xl">Actions</h1>
        <div className="mt-4 flex flex-row justify-evenly items-center gap-4">
          <button
            onClick={() => navigate(`/teacher/${username}/create-test`)}
            className="flex-1 py-2 rounded-lg border border-white bg-black text-white hover:bg-white hover:border-black hover:text-black transition-all duration-300"
          >
            Create Test
          </button>
          <button
            onClick={() => navigate(`/teacher/${username}/tests`)}
            className="flex-1 py-2 rounded-lg border border-white bg-black text-white hover:bg-white hover:border-black hover:text-black transition-all duration-300"
          >
            Past Tests
          </button>
          <button className="flex-1 py-2 rounded-lg border border-white bg-black text-white hover:bg-white hover:border-black hover:text-black transition-all duration-300">
            Test Stats
          </button>
        </div>
      </div>

      <div>
        <h1 className="text-2xl ">Faculty Metrics</h1>
        <PerformanceChart />
      </div>

      <div>
        <h1 className="text-2xl">Last Test Metrics</h1>
        <p className="text-xl">Performance overview</p>
        <div className="mt-2 flex flex-row justify-evenly items-center gap-4">
          <div className="flex-1 px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-50">
            <p className="font-thin text-sm">Average Class Score</p>
            <p>85</p>
            <p>+5%</p>
          </div>
          <div className="flex-1 px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-50">
            <p className="font-thin text-sm">Pass Rate</p>
            <p>75%</p>
            <p>-2%</p>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-evenly items-center gap-4 p-4">
        <button className="flex-1 bg-black border text-white py-2 rounded-lg hover:bg-white hover:border-black hover:text-black mb-10 transition-all duration-300">
          Export Data
        </button>
        <button className="flex-1 bg-black border text-white py-2 rounded-lg hover:bg-white hover:border-black hover:text-black mb-10 transition-all duration-300">
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default TeacherDash;
