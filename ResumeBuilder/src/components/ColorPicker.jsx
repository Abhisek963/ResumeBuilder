import { Check, Palette } from 'lucide-react'
import React, { useState } from 'react'

const ColorPicker = ({selectedColor, onChange}) => {

    const colors = [
  { name: 'Royal Blue', value: '#2563EB' },      // modern primary
  { name: 'Emerald', value: '#059669' },         // rich green
  { name: 'Crimson', value: '#DC2626' },         // strong but professional red
  { name: 'Violet', value: '#7C3AED' },          // premium purple
  { name: 'Amber', value: '#D97706' },           // warm professional orange
  { name: 'Slate', value: '#334155' },           // classy dark neutral
  { name: 'Rose', value: '#E11D48' },            // elegant pink-red
  { name: 'Cobalt', value: '#1D4ED8' },          // deep blue
  { name: 'Turquoise', value: '#0D9488' },       // modern teal
  { name: 'Sunset', value: '#F97316' },          // vibrant but not childish
  { name: 'Lavender', value: '#8B5CF6' },        // softer purple
  { name: 'Midnight', value: '#0F172A' },        // premium dark theme
];

    
    const [isOpen, setIsOpen] = useState(false)


  return (
    <div className='relative'>
        <button  onClick={()=>setIsOpen(!isOpen)} className='flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-100 to-purple-200 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg'>
            <Palette size={16}/> <span className='max-sm:hidden'>Accent Color</span>
        </button>
        {isOpen && (
            <div className='grid grid-cols-4 w-60 gap-2 absolute top-full left-0 right-0 p-3 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-sm'>
                {colors.map((color)=>(
                    <div key={color.value} className='relative cursor-pointer group flex flex-col ' onClick={()=>{onChange(color.value); setIsOpen(false)}}>
                        <div className="w-12 h-12 rounded-full border-2 border-transparent group-hover:border-black/25 transition-colors"
                        style={{backgroundColor: color.value}}></div>
                        {selectedColor === color.value && (
                            <div className='absolute top-0 left-0 right-0 bottom-4.5 flex items-center justify-center  '>
                                <Check className='size-4 text-white '/>
                            </div>
                        )}
                        <p className='text-xs mt-1 text-gray-600 text-center'>{color.name}</p>

                    </div>
                ))}

            </div>
        )}
    </div>
  )
}

export default ColorPicker
