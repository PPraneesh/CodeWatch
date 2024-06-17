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
    <div className='fixed top-20 left-1/3 w-1/2 m-auto bg-gray-500 p-8 rounded-2xl shadow-[5px_5px_20px_0px]'>
      <span className='absolute top-2 right-6 text-3xl hover:cursor-pointer' onClick={()=>{setMcqPane(false); setCodingPane(false)}}>x</span>
      {
        qtype ?
          <form onSubmit={handleSubmit(onCSubmit)} className='flex flex-col gap-4 '>
            <h1 className='text-2xl text-white font-semibold'>Add Coding Question</h1>
            <input type="text" placeholder='Enter Question' className='px-4 py-2 rounded-md' required {...register('question')} />
            <input type="text" placeholder='Enter Description' className='px-4 py-2 rounded-md' required {...register('description')} />
            <input type="text" placeholder='Enter Constraints' className='px-4 py-2 rounded-md' required {...register('constraints')} />
            <input type="text" placeholder='Enter Input' className='px-4 py-2 rounded-md' required {...register('input')} />
            <input type="text" placeholder='Enter Output' className='px-4 py-2 rounded-md' required {...register('output')} />
            <input type="text" placeholder='Enter Test Input' className='px-4 py-2 rounded-md' required {...register('testInput')} />
            <input type="text" placeholder='Enter Test Output' className='px-4 py-2 rounded-md' required {...register('testOutput')} />
            <input type="text" placeholder='Enter Difficulty' className='px-4 py-2 rounded-md' required {...register('difficulty')} />
            <button type='submit' className='px-4 py-2 bg-black/80 rounded-md text-white '>Add</button>
          </form>

          :

          <form onSubmit={handleSubmit(onMSubmit)} className='flex flex-col gap-4'>
            <h1 className='text-2xl text-white font-semibold'>Add MCQ</h1>
            <input type="text" placeholder='Enter Question' className='px-4 py-2 rounded-md'  required {...register('question')} />
            <input type="text" placeholder='Enter Difficulty'  className='px-4 py-2 rounded-md' required {...register('difficulty')} />
            <input type="text" placeholder='Enter Option 1'  className='px-4 py-2 rounded-md' required {...register('options.0')} />
            <input type="text" placeholder='Enter Option 2'  className='px-4 py-2 rounded-md' required {...register('options.1')} />
            <input type="text" placeholder='Enter Option 3' className='px-4 py-2 rounded-md'  required {...register('options.2')} />
            <input type="text" placeholder='Enter Option 4' className='px-4 py-2 rounded-md'  required {...register('options.3')} />
            <input type="text" placeholder='Enter Correct Answer' className='px-4 py-2 rounded-md' required {...register('correctOption')} />
            <button type='submit' className='px-4 py-2 bg-black/80 rounded-md text-white active:bg-white active:text-black'>Add</button>
          </form>
      }
    </div>
  )
}

export default QuestionInput