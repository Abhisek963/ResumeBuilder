import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import ResumePreview from '../components/ResumePreview'
import Loader from '../components/Loader'
import { ArrowLeftIcon } from 'lucide-react'
import api from '../configs/api'  

const Preview = () => {
  

  const {resumeId} = useParams()
  const [loading, setLoading] = useState(true)

  const [resumeData, setResumeData] = useState(null)

  const loadExistingResume = async (resumeId) => {
  try {
    const { data } = await api.get('/api/resumes/public/' + resumeId)
    setResumeData(data.resume)
  } catch (error) {
    console.log("Error loading resume:", error.message)
  } finally {
    setLoading(false)
  }
}


  useEffect(() => {
  if(resumeId) loadExistingResume(resumeId)
},[resumeId])

  return resumeData ? (
    <div className='bg-slate-200'>
      <div className='max-w-3xl mx-auto py-10' >
        <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} classes="py-6 bg-white" />
</div>
    </div>
  ) : (
    <div>
      {loading ? <Loader /> : (
        <div className='flex flex-col items-center justify-center h-screen'>
          <p className='text-center text-6xl text-slate-500 font-medium'>Resume not found</p>
          <a href='/' className='mt-6 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-blue-400 flex items-center transition-colors'>
          <ArrowLeftIcon className="w-4 h-4 inline mr-2" /> Go back to home</a>
        </div>
      )}
    </div>
  )
}

export default Preview