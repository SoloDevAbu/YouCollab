import React from 'react'
import OptionsCard from '../OptionsCard'
import ytLogo from '../../../assets/logo/youtube.png'
import uploadLogo from '../../../assets/logo/upload (1).png'
import pendingLogo from '../../../assets/logo/pending.png'
import approvedLogo from '../../../assets/logo/check-mark.png'
import rejectLogo from '../../../assets/logo/remove.png'
import settingLogo from '../../../assets/logo/settings.png'
import recentLogo from '../../../assets/logo/recent.png'
import { useNavigate } from 'react-router-dom'

const EditorDashboardLeft = ({setSearchParams}) => {

    const [selectedTab, setSelectedTab] = useState('recent-upload');

    const navigate = useNavigate();

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        setSearchParams({tab});
    }

    return (
        <div className='mx-4 flex flex-col h-screen'>
            <h1 className='text-lg font-bold mt-2'>Hi, Editor Name</h1>
            <OptionsCard logo={ytLogo} name={'Channel Name'}/>
            <OptionsCard logo={uploadLogo} name={'New Upload'}  onClick={() => handleTabChange('new-upload')} isSelected={selectedTab === 'new-upload'}/>
            <OptionsCard logo={recentLogo} name={'Recent Upload'}  onClick={() => handleTabChange('recent-upload')} isSelected={selectedTab === 'recent-upload'}/>
            <OptionsCard logo={approvedLogo} name={'Recent Approved'}  onClick={() => handleTabChange('recent-approved')} isSelected={selectedTab === 'recent-approved'}/>
            <OptionsCard logo={pendingLogo} name={'Pending Approval'} onClick={() => handleTabChange('pending-approval')} isSelected={selectedTab === 'pending-approval'}/>
            <OptionsCard logo={rejectLogo} name={'Rejected Videos'} onClick={() => handleTabChange('rejected')} isSelected={selectedTab === 'rejected'}/>

            <div className='bg-gray-200 mt-2 py-2 px-4 rounded-lg flex items-center fixed bottom-4 gap-4 cursor-pointer'
                onClick={() => navigate('/editor/profile')}
            >
                <img src={settingLogo} alt="Channel" className='h-6' />
                <h3 className='font-semibold mx-auto'>Settings</h3>
            </div>
        </div>
    )
}

export default EditorDashboardLeft