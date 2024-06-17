import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Editor from "@monaco-editor/react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import axios from 'axios';

interface InterfaceProps {
  qId: string,
  language: string,
  setCodingData: any
}


const CodingInterface: React.FC<InterfaceProps> = ({ qId, language, setCodingData }) => {
  const { username, testId } = useParams() 

  const getOutput = (outputDetails: any) => {
    let statusId = outputDetails?.status?.id;
    console.log(outputDetails.status)
    setCodingData({stats: outputDetails.status, qId: qId})
    const atobHandler = (str:any) => {
      try {
        return atob(str);
      } catch (error) {
        console.error("Failed to decode base64 string:", error);
        return "Error: Invalid base64 encoding";
      }
    };
    if (statusId === 6) {
      console.log("compile_output:", outputDetails?.compile_output);
      return (
        <pre>
          {atobHandler(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      console.log("stdout:", outputDetails.stdout);
      return (
        <pre>
          {outputDetails.stdout !== null
            ? (runOrSubmit === "run" ? atobHandler(outputDetails.stdout) : outputDetails.status.description)
            : null
          }
        </pre>
      );
    } else {
      console.log("stderr:", outputDetails?.stderr);
      return (
        <pre>
          {atobHandler(outputDetails?.stderr)}
        </pre>
      );
    }
  };

  interface Problem {
    description: String,
    question: String,
    constraints: String,
    difficulty: String,
    input: String,
    output:String,
    Stringquestion:String,
  }

  const [problem, setProblem] = useState<Problem>();
  const [code, setCode] = useState(()=>{
    if(language === 'C++')
      return "#include <iostream>\nusing namespace std;\nint main() {\n\t// your code goes here\n\treturn 0;\n}"
    else if(language === 'Python')
      return "# your code goes here"
  })
  let [processing, setProcessing] = useState(false);
  let [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [runOrSubmit, setRunOrSubmit] = useState("");

  useEffect(() => {

    axios.get(`/api/student/${username}/test/${testId}/c/${qId}`)
      .then(res => {
        setProblem(res.data.payload)
        setInput(res.data.payload.input)
      })
      .catch(err => {
        console.log(err)
      })
  }, [qId])


  const handleRun = () => {
    if (processing === false) {
      console.log("enduk ra nee bathuku",{
        code: code,
        customInput: input,
        problem: problem,
        language: language
      })
      setProcessing(true);
      setRunOrSubmit("run");
      axios
        .post(`/api/student/${username}/test/${testId}/c/${qId}/run`, {
          code: code,
          customInput: input,
          problem: problem
        })
        .then((res) => {
          console.log(res.data)
          setProcessing(false);
          setOutput(JSON.stringify(res.data.result));
        })
        .catch((err) => {
          console.log(err);
          setProcessing(false);
          setOutput("Error");
        });
    }
  };
  const handleSubmit = () => {
    if (processing === false) {
        setProcessing(true);
        setRunOrSubmit("submit");

      axios
        .post(`/api/student/${username}/test/${testId}/c/${qId}/submit`, {
          code: code,
          customInput: input,
          problem: problem,
        })
        .then((res) => {
          setProcessing(false);
          setOutput(JSON.stringify(res.data.result));
        })
        .catch((err) => {
          console.log(err);
          setProcessing(false);
          setOutput("Error");
        });
    }
  };
  const handleCodeChange = (value: any) => {
    setCode(value);
  }
  const handleInput = (e:any)=>{
    setInput(e.target.value)
  }

  return (
    <div>
      <div className="header-div">
        <div className="buttons-header">
          <button onClick={handleRun} className="run-btn">
            Run
          </button>
          <button onClick={handleSubmit} className="submit-btn">
            Submit
          </button>
        </div>
      </div>
      {/* <div className="content"> */}
      <PanelGroup autoSaveId="example" direction="horizontal">
        <Panel defaultSize={30} minSize={20}>
          <div className="problem-pane">
            <div className="problem">
              <h2 className='text-2xl mt-4'>Problem</h2>
              <h1 className='text-2xl'>{problem?.question}</h1>
              <h2 >{problem?.description}</h2>
              <h3 className='text-2xl mt-4'>Difficulty:</h3>
              <h3 className='text-xl mt-4'> {problem?.difficulty}</h3>
              <h3 className='text-2xl mt-4'>Constraints</h3>
              <p className='text-xl mt-4'>{problem?.constraints}</p>
              <h3 className='text-2xl mt-4'>Input</h3>
              <code className='text-xl mt-4'>{problem?.input}</code>
              <h3 className='text-2xl mt-4'>Output</h3>
              <p className='whitespace-pre text-xl mt-4'>{problem?.output}</p>
            </div>
          </div>
        </Panel>
        <PanelResizeHandle className="resize-handle" />
        <Panel minSize={20} defaultSize={70} className="overflow-scroll min-h-[calc(100vh-50px)]">
          <PanelGroup autoSaveId="example" direction="vertical">
            <Panel defaultSize={50} className="editor-pane">
              <Editor
                  height="90vh"
                  theme="vs-dark"
                  defaultLanguage={language}
                  onChange={handleCodeChange}
                  value={code}
                />
            </Panel>
            <PanelResizeHandle className="resize-handlev" />
            <Panel minSize={7} defaultSize={35} maxSize={90}>
              <div className="stats-pane">
                <h2>Testcases</h2>
                <PanelGroup autoSaveId="example" direction="horizontal">
                  <Panel defaultSize={50} className="input-pane">
                    <div className="inputPane whitespace-pre">
                      <h2>Input</h2>
                      <textarea rows={7} onChange={handleInput} className='text-black p-2 whitespace-pre' value={String(problem?.input)} />
                    </div>
                  </Panel>
                  <hr />
                  <Panel defaultSize={50} className="output-pane">
                    <div className="output-pane">
                    <h2>Console</h2>
                    <div className="output">
                          {
                            processing ? (
                              <>
                                <h3>Processing...</h3>
                                <div className="loading">
                                  {/* <img src="/tube-spinner.svg" alt="loading" /> */}
                                </div>
                              </>
                            ) :

                              output ? (
                                getOutput(JSON.parse(output))
                              ) : (
                                <h3>{output}</h3>
                              )
                          }
                        </div>
                    </div>
                  </Panel>
                </PanelGroup>
              </div>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
    // </div>
  )
}

export default CodingInterface