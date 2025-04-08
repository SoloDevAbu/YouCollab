import React from 'react'
import EditorInfo from '../../../components/editor/EditorInfo'
// import EditorUpload from '../components/editor/EditorUpload'

const EditorProfile = () => {
  return (
    <div className='flex flex-col md:flex-row pt-12'>
      <div className='w-full md:w-1/4'>
        <EditorInfo/>
      </div>
      <div className='w-full md:w-3/4'>
        {/* <EditorUpload/> */}
      </div>
    </div>
  )
}

export default EditorProfile