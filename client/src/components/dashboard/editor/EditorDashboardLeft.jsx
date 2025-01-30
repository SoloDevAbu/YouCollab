import React from 'react'
import OptionsCard from '../OptionsCard'
import ytLogo from '../../../assets/logo/youtube.png'
import uploadLogo from '../../../assets/logo/upload (1).png'
import pendingLogo from '../../../assets/logo/pending.png'
import approvedLogo from '../../../assets/logo/check-mark.png'
import rejectLogo from '../../../assets/logo/remove.png'
import settingLogo from '../../../assets/logo/settings.png'
import recentLogo from '../../../assets/logo/recent.png'

const EditorDashboardLeft = () => {
    return (
        <div className='mx-4 flex flex-col h-screen'>
            <h1 className='text-lg font-bold mt-2'>Hi, Editor Name</h1>
            <OptionsCard logo={ytLogo} name={'Youtuber Channel Name'} />
            <OptionsCard logo={uploadLogo} name={'New Upload'} />
            <OptionsCard logo={recentLogo} name={'Recent Upload'} />
            <OptionsCard logo={approvedLogo} name={'Recent Approved'} />
            <OptionsCard logo={pendingLogo} name={'Pending Approval'} />
            <OptionsCard logo={rejectLogo} name={'Rejected Videos'} />

            <div className='bg-gray-200 mt-2 py-2 px-4 rounded-lg flex items-center fixed bottom-4 gap-4'>
                <img src={settingLogo} alt="Channel" className='h-6' />
                <h3 className='font-semibold mx-auto'>Settings</h3>
            </div>
        </div>
    )
}

export default EditorDashboardLeft