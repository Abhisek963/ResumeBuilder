import { Check, Layout } from 'lucide-react'
import React from 'react'
import { useState } from 'react'

const TemplateSelector = ({selectedTemplate, onChange}) => {

    const [isOpen, setIsOpen] = useState(false)

    const templates = [
        {id: 'classic', name: 'Classic', preview: "A timeless design with a clean layout, suitable for all industries."},
        {id: 'modern', name: 'Modern', preview: "A sleek and contemporary design with bold headings and ample white space."},
        {id: 'minimal', name: 'Minimal', preview: "A clean and simple design with minimal visual elements."},
        {id: 'minimal-image', name: 'Minimal with Image', preview: "A minimal design that includes a profile image."},
        {id: "corporate", name: 'Corporate', preview: "A structured and professional two-column layout ideal for corporate roles."},
        {id: 'timeline', name: 'Timeline', preview: "A modern timeline-based layout highlighting experience progression." },
        {id: 'ats', name: 'ATS Friendly', preview: "A clean, parser-friendly layout optimized to pass Applicant Tracking Systems." }
];


  return (
    <div className='relative'>
        <button onClick={()=>setIsOpen(!isOpen)} className='flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-100 to-blue-200 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg'>
            <Layout size={14}/> <span className='max-sm:hidden'>Templates</span>
        </button>
        {isOpen && (
            <div className='absolute top-full w-xs p-3 mt-2 space-y-3 z-10 bg-white rounded-md border border-gray-200 shadow-sm'>
                {templates.map((template)=>(
                    <div key={template.id} onClick={()=>{onChange(template.id); setIsOpen(false)}} className={`relative p-3 border rounded-md cursor-pointer transition-all ${selectedTemplate === template.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>{selectedTemplate === template.id && (
                        <div className='absolute top-2 right-2'>
                            <div className='size-5 bg-blue-400 rounded-full flex items-center justify-center '>
                                <Check className='w-3 h-3 text-white'/>
                            </div>
                        </div>
                    )}
                    <div className='space-y-2'>
                        <h4 className='font-medium text-sm text-gray-800'>{template.name}</h4>
                        <div className='text-xs text-gray-500 mt-1 px-4 py-2 rounded-2xl bg-blue-50 rounded italic'>{template.preview}</div>
                    </div>
                    </div>
                ))}

            </div>
        )}
    </div>
  )
}

export default TemplateSelector