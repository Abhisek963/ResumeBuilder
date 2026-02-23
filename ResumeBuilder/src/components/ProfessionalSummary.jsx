import React, { useState } from 'react'
import {Loader2Icon, Sparkles} from 'lucide-react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ProfessionalSummary = ({data, onChange, setResumeData}) => {

  const {token} = useSelector(state=> state.auth)
  const[isGenerating, setIsGenerating] = useState(false)

  const generateSummary = async()=>{
    try {
      setIsGenerating(true)
      const prompt = `enhance my professional summary "${data}"`;
      const response = await api.post('/api/ai/enhance-pro-summary',{userContent: prompt}, {headers: {Authorization: token}})
      setResumeData(prev=> ({...prev, professional_summary: response.data.enhancedSummary}))
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Something went wrong")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Professional Summary</h3>
          <p className='text-sm text-gray-500'>Add summary for your resume here</p>
        </div>
        <button onClick={generateSummary} disabled={isGenerating} className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-2xl hover:bg-purple-200 transition-colors disabled:opacity-50 ' >
          {isGenerating ? (<Loader2Icon className='animate-spin size-4' />) : (<Sparkles className='size-4' />)}
          {isGenerating ? "Enhancing..." : "Ai Enhance"}
        </button>
      </div>
        <div className='mt-6'>
          <textarea value={data || ""} onChange={(e)=> onChange(e.target.value)} rows={7} className='w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none' placeholder='Write a professional summary that highlights your key strengths and career objectives.....' />
            <p className='text-xs text-gray-500 max-w-4/5 mx-auto text-center'>Tip: Think of this as your quick introduction. (In 3–4 sentences), share your strongest skills, proudest achievements, and the kind of value you bring. Keep it clear, honest, and relevant.</p>
        </div>
    </div>
  )
}

export default ProfessionalSummary