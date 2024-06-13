import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import CodingInterface from './CodingInterface';
import Toast from '../components/Toast';

interface MCQ {
  question: string,
  difficulty: string,
  options: string[],
  correctOption: string
}

const Test: React.FC = () => {
  const navigate = useNavigate();
  const [testdata, setTestdata] = useState<any>(null);
  const { username, testId } = useParams();
  const [question, setQuestion] = useState<any>({ question: null, type: null });
  const [codingStats, setCodingStats] = useState<boolean[]>([]);
  const [mcqStats, setMcqStats] = useState<boolean[]>([]);
  const [mcqs, setMcqs] = useState<MCQ | null>(null);
  const [codingData, setCodingData] = useState<any>([]);

  

  useEffect(() => {
    if (testdata) {
      setCodingStats(Array(testdata.codingQuestions.length).fill(false));
      setMcqStats(Array(testdata.mcqQuestions.length).fill(false));
    }
  }, [testdata]);

  const fetchFirst = () => {
    axios.get(`https://special-orbit-j6vww6q5qpqhjjq4-5000.app.github.dev/student/${username}/test/${testId}`)
      .then(res => {
        if (res.data.message === 'Test not found')
          return console.log('test not found');
        else if (res.data.message === 'Test found') {
          setTestdata(res.data.payload);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };


  const handleMcqChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOption = e.target.id;
    const index = testdata.mcqQuestions.indexOf(question.question);
    const updatedMcqStats = [...mcqStats];
    if (selectedOption === mcqs?.correctOption) {
      console.log('correct');
      const updatedMcqStats = [...mcqStats];
      updatedMcqStats[index] = true;
      setMcqStats(updatedMcqStats);
    } else {
      console.log('incorrect');
      updatedMcqStats[index] = true;
      setMcqStats(updatedMcqStats);
      // Do not change mcqStats[index] to false; keep it unchanged
    }
  };

  useEffect(() => {
    const Visibility = async () => {
      if (document.visibilityState === 'hidden') {
        console.log('hidden');
      }
      else {
        axios.get(`https://special-orbit-j6vww6q5qpqhjjq4-5000.app.github.dev/student/${username}/test/${testId}/cheater`)
        .then(res=>{
            console.log(res.data)
        })
            console.log("heheheh you are busted")
      }
    };
    document.addEventListener('visibilitychange', Visibility)
  }, [])


  useEffect(() => {
    if (question?.type === 'mcq') {
      axios.get(`https://special-orbit-j6vww6q5qpqhjjq4-5000.app.github.dev/student/${username}/test/${testId}/m/${question?.question}`)
        .then(res => {
          if (res.data.message === 'Question found')
            setMcqs(res.data.payload);
          else {
            // toast
            console.log('error mcq fetch');
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [question]);

  // const handleCodingData = (data: any) => {
  //   const { qId, isCorrect } = data;
  //   const index = testdata.codingQuestions.indexOf(qId);
  //   if (isCorrect) {
  //     const updatedCodingStats = [...codingStats];
  //     updatedCodingStats[index] = true;
  //     setCodingStats(updatedCodingStats);
  //   }
  //   // Do not change codingStats[index] to false; keep it unchanged
  // };

  useEffect(() => {
    fetchFirst();
  }, []);

  async function handleSubmit(){
    let codingScore = 0;
    let mcqScore = 0;

    codingStats.forEach((stat) => {
      if(stat) codingScore+=5;
    });
    mcqStats.forEach((stat) => {
      if(stat) mcqScore+=2;
    });
    await axios.post(`https://special-orbit-j6vww6q5qpqhjjq4-5000.app.github.dev/student/${username}/test/${testId}/submit`,{
      codingScore : codingScore,
      mcqScore: mcqScore
    })
    .then(res=>{
      console.log(res.data)
      Toast.Success('Test Submitted Successfully');
      navigate(`/student/${username}/results`)
    })
  }

  return (
    <div className='w-screen h-screen flex flex-row bg-black'>
      <div className='w-[10%] bg-black h-full pl-2 py-10'>
        <h2 className='text-[#f8b739] text-3xl'>{testdata?.testName}</h2>
        <div className='my-6'>
          <h1 className='text-[#f8b739]'>Coding Questions</h1>
          {testdata?.codingQuestions.map((ques: any, index: number) => (
            <div key={index}>
              <p
                className='text-[#08e8de] hover:cursor-pointer'
                onClick={() => {
                  setQuestion({ question: ques, type: 'coding' });
                }}>
                Question{index + 1}
              </p>
            </div>
          ))}
        </div>
        <div>
          <h1 className='text-[#f8b739]'>MCQs</h1>
          {testdata?.mcqQuestions.map((ques: any, index: number) => (
            <div key={index}>
              <p
                className='text-[#08e8de] hover:cursor-pointer'
                onClick={() => setQuestion({ question: ques, type: 'mcq' })}>
                Question{index + 1}
              </p>
            </div>
          ))}
        </div>

        <button className='px-4 py-2 m-6 mt-10 bg-[#f8b739]' onClick={handleSubmit} >Submit</button>
      </div>

      <div className='w-[90%] h-full'>
        {question?.type === 'mcq' ? (
          <div className='bg-white p-8 h-full w-full'>
            <h1 className='text-4xl '>Multi-choice questions</h1>
            <p className='italic '>{mcqs?.difficulty}</p>
            <div className='mt-8 '>
              <h2 className='text-2xl'>{mcqs?.question}</h2>
              <div>
                {mcqs?.options.map((option, index) => (
                  <div key={index} className='my-4'>
                    <input type='radio' name='mcq' id={option} onChange={handleMcqChange} />
                    <label htmlFor={option}>{option}</label>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          <div>
            <CodingInterface qId={question?.question} language={testdata?.language} setCodingData={setCodingData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Test;
