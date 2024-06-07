import React from 'react'
import { useForm } from 'react-hook-form'


interface QuestionInputProps {
  qtype: boolean,
  setCodingQuestions: any,
  setMcqs: any
  setCodingPane: any
  setMcqPane: any
}

const QuestionInput: React.FC<QuestionInputProps> = ({ qtype, setCodingQuestions, setMcqs, setCodingPane, setMcqPane }) => {
  const { register, handleSubmit } = useForm()

  const onCSubmit = (data: any) => {
    console.log(data)
    setCodingQuestions((prevCodingQuestions: any) => [...prevCodingQuestions, data])
    setCodingPane(false)
  }

  const onMSubmit = (data: any) => {
    console.log(data)
    setMcqs((prevMcqs: any) => [...prevMcqs, data])
    setMcqPane(false)
  }
  return (
    <div className='fixed top-1/3 left-1/3 w-1/2 m-auto bg-gray-200 p-8'>
      <span className='absolute top-2 right-6 text-3xl hover:cursor-pointer' onClick={()=>{setMcqPane(false); setCodingPane(false)}}>x</span>
      {
        qtype ?
          <form onSubmit={handleSubmit(onCSubmit)} className='w-full flex flex-col gap-2'>
            <h1>Add coding Question</h1>
            <input type="text" placeholder='Enter Question' required {...register('question')} />
            <input type="text" placeholder='Enter Difficulty' required {...register('difficulty')} />
            <input type="text" placeholder='Enter Test Cases' required {...register('testCases')} />
            <input type="text" placeholder='Enter Input' required {...register('input')} />
            <input type="text" placeholder='Enter Output' required {...register('output')} />
            <input type="text" placeholder='Enter Constraints' required {...register('constraints')} />
            <button type='submit' className='px-4 py-2 bg-black/80 rounded-md text-white '>Add</button>
          </form>

          :

          <form onSubmit={handleSubmit(onMSubmit)} className='flex flex-col gap-2'>
            <h1>Add MCQ</h1>
            <input type="text" placeholder='Enter Question' required {...register('question')} />
            <input type="text" placeholder='Enter Difficulty' required {...register('difficulty')} />
            <input type="text" placeholder='Enter Option 1' required {...register('options.0')} />
            <input type="text" placeholder='Enter Option 2' required {...register('options.1')} />
            <input type="text" placeholder='Enter Option 3' required {...register('options.2')} />
            <input type="text" placeholder='Enter Option 4' required {...register('options.3')} />
            <input type="text" placeholder='Enter Correct Option' required {...register('correctOption')} />
            <button type='submit' className='px-4 py-2 bg-black/80 rounded-md text-white'>Add</button>
          </form>
      }
    </div>
  )
}

export default QuestionInput