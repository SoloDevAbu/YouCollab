import React from 'react'
import EditorDashboardLeft from '../components/dashboard/editor/EditorDashboardLeft'
import EditorDashboradRight from '../components/dashboard/editor/EditorDashboradRight'

const EditorDashboard = () => {
return (
    <div className='md:flex justify-center pt-12'>
            <div className='hidden md:block md:w-1/4'>
                    <EditorDashboardLeft/>
            </div>
            <div className='hidden md:w-px bg-gray-300 mx-4 h-screen'></div>
            <div className='md:w-3/4'>
                    <EditorDashboradRight/>
            </div>
    </div>
)
}

export default EditorDashboard