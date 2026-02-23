import { PlusCircleIcon, SparkleIcon, X } from 'lucide-react'
import React, { useState } from 'react'

const Skills = ({data,onChange}) => {

    const [newSkill, setNewSkill] = useState("")

    const addSkill =() =>{
        if(newSkill.trim() && !data.includes(newSkill.trim())) {
            onChange([...data, newSkill.trim()])
            setNewSkill("")
        }
    }

    const removeSkill = (index) => {
        const updated = data.filter((_, i)=> i !== index);
        onChange(updated)
    }

    const handelKeyPress = (e) => {
        if(e.key === 'Enter'){
            e.preventDefault();
            addSkill()
        }
    }


  return (
    <div className='space-y-4'>
        <div>
            <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Skills</h3>
            <p className='text-sm text-gray-500'>Add your skills to help recruiters understand your expertise.</p>
        </div>

        <div className='flex gap-2'>
            <input type="text" placeholder='Enter your skills' className='flex px-3 py-2 text-sm' onChange={(e)=>setNewSkill(e.target.value)} value={newSkill} onKeyDown={handelKeyPress}/>
            <button onClick={addSkill} disabled={!newSkill.trim()} className='flex items-center gap-2 px-3 py-2 text-sm bg-indigo-300 text-purple-900 rounded-2xl hover:bg-purple-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed' >
                <PlusCircleIcon className='size-4'/> Add
            </button>
        </div>
    {data.length > 0 ? (
        <div className='flex flex-wrap gap-2'>
            {data.map((skill, index)=>(
                <span key={index} className='flex items-center gap-1 px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-full'>
                    {skill}
                    <button onClick={()=>removeSkill(index)} className='ml-1 text-gray-500 hover:text-gray-700 p-1 rounded-full transition-colors'>
                        <X className='h-3 w-3'/>
                    </button>
                </span>
            ))}

        </div>
    ) : (
        <div className='text-center py-6 text-gray-600'>
            <SparkleIcon className='w-12 h-12 mx-auto mb-3 text-gray-300'/>
            <p className='text-center text-gray-500'>No skills added yet...</p>
            <p className='text-center text-sm text-gray-400'>Start adding your skills to make your resume stand out.</p>
        </div>
    )}
    <div className='bg-blue-100 p-3 rounded-lg'>
        <p className='text-sm text-blue-800'>  <strong>Tip:</strong>Add skills to your resume to make it more attractive to recruiters. Include technical skills, soft skills.</p>
    </div>
    </div>
  )
}

export default Skills
