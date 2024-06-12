import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const TestCodeInput: React.FC = () => {
    const [testCode, setTestCode] = useState<string>('') 
    const [sysNum, setSysNum] = useState<string>('')
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()
        navigate(`/test/${testCode}`)
    }

    
    
    return (
        <div>
            <form onSubmit={onSubmit}>
                <p>enter test code</p>
                <input type="text" value={testCode} onChange={(e) => setTestCode(e.target.value)} />
                <p>enter system number</p>
                <input type="text" value={sysNum} onChange={(e) => setSysNum(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default TestCodeInput