import React from 'react'
import OptionsCard from '../OptionsCard'
import editorLogo from '../../../assets/logo/editor.png'
import recentLogo from '../../../assets/logo/recent.png'
import pendingLogo from '../../../assets/logo/pending.png'
import approvedLogo from '../../../assets/logo/check-mark.png'
import rejectLogo from '../../../assets/logo/remove.png'
import settingLogo from '../../../assets/logo/settings.png'
import alluploads from '../../../assets/logo/allvideos.png'
import { useNavigate } from 'react-router-dom'

const YoutuberDashboardLeft = ({setSearchParams}) => {

  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setSearchParams({ tab });
  }

  return (
    <div className='mx-4 flex flex-col h-screen'>
      <h1 className='text-lg font-bold mt-2'>Hi, Youtuber Name</h1>
      <OptionsCard logo={editorLogo} name={'Editors'} onClick={() => handleTabChange('editors')}/>
      <OptionsCard logo={recentLogo} name={'Recent Uploads'} onClick={() => handleTabChange('recent-uploads')} />
      <OptionsCard logo={alluploads} name={'All Uploads'} onClick={() => handleTabChange('all-uploads')} />
      <OptionsCard logo={pendingLogo} name={'Pending Approvals'} onClick={() => handleTabChange('pending-approval')} />
      <OptionsCard logo={approvedLogo} name={'Approved'} onClick={() => handleTabChange('approved')} />
      <OptionsCard logo={rejectLogo} name={'Rejected'} onClick={() => handleTabChange('rejected')} />

      <div className='bg-gray-200 mt-2 py-2 px-4 rounded-lg flex items-center fixed bottom-4 gap-4 cursor-pointer'
        onClick={() => navigate('/youtuber/profile')}
      >
        <img src={settingLogo} alt="Channel" className='h-6' />
        <h3 className='font-semibold mx-auto'>Settings</h3>
      </div>
    </div>
  )
}

export default YoutuberDashboardLeft