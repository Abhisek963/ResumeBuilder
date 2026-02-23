import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="animate-spin rounded-full size-14 h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
}

export default Loader
