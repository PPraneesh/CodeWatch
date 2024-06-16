import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Toast from '../components/Toast'


interface Test {
    duration: string,
    email: string,
    examTime: string,
    language: string,
    mcqQuestions: string[],
    numCodingQues: number,
    numMcqs: number,
    status: string,
    testId: string,
    testName: string
}

const TestCodeInput: React.FC = () => {
    const [testCode, setTestCode] = useState<string>('')
    const [sysNum, setSysNum] = useState<string>('')
    const [test, setTest] = useState<Test>();
    const [res, setRes] = useState<any>(true)
    const { username, testId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setRes(true)
    }, [])

    const onSubmit = async (e: any) => {
        e.preventDefault()
        const url = `https://special-orbit-j6vww6q5qpqhjjq4-5000.app.github.dev/student/${username}/test/${testCode}`
        await axios.get(url)
            .then((res) => {
                console.log(res.data)
                if (res.data.message === "Test found") {
                    setTest(res.data.payload)
                    setRes(false)
                }
                else {
                    Toast.Error(res.data.message)
                }
            })
            .catch((err) => {
                console.error(err)
            })
    }

    return (
    <>
        <h1 className='text-4xl text-black text-center p-8 bg-gray-100 mb-1200 py-10'>Enter Test</h1>

        {res ?
            // <div>

            <div className='flex justify-center items-start min-h-screen py-10 mb-30 bg-gray-100 '>

                <form onSubmit={onSubmit} className='flex flex-col'>

                    <p className="text-2xl py-3" >Enter test code</p>
                    <input className="placeholder:italic placeholder:text-slate-400 block bg-white mb-4 w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Enter test ID" type="text" value={testCode} onChange={(e) => setTestCode(e.target.value)} />

                    <p className="text-2xl py-3" >Enter system number</p>
                    <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Enter system number" type="text" value={sysNum} onChange={(e) => setSysNum(e.target.value)} />

                    <button type="submit" className='px-6 py-2 mt-4 rounded-md mx-auto active:bg-blue-400 text-[#fdd017]  bg-black' >Submit</button>
                </form>
            </div>
            :
            <div className='p-8 flex flex-col gap-4'>
                <div className='font-semibold text-xl'>{test?.testName}</div>
                <hr />
                <div>
                    {test?.status === 'completed' && <Link to={`/student/${username}/test/${testCode}/result`}>Show result</Link>}
                    {test?.status === 'upcoming' && <h2>Wait, Test is about to start</h2>}
                    {test?.status === 'ongoing' && <button className='bg-green-600 px-4 py-2 text-white' onClick={() => navigate(`/student/${username}/test/${testCode}`)}>Start</button>}
                </div>
                <div className='flex items-center gap-4'>
                    <h2 className='text-2xl'>testId:</h2>
                    <p className='text-xl'>{test?.testId}</p>
                </div>

                <div>
                    <p>teacher email: {test?.email}</p>
                </div>
                <div>language: {test?.language}</div>
            </div>
            // </div>
        }

    </>)
}

export default TestCodeInput