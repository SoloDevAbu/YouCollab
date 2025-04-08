import React from 'react'
import NewUpload from './NewUpload'
import RecentUpload from './RecentUpload'
import PendingApproval from './PendingApproval'
import RecentApproval from './RecentApproval'
import RejectVideos from './RejectVideos'

const EditorDashboradRight = ({selectedOption}) => {
  return (
    <div>
            {selectedOption === 'new-upload' && <NewUpload />}
            {selectedOption === 'recent-upload' && <RecentUpload />}
            {selectedOption === 'pending-approval' && <PendingApproval />}
            {selectedOption === 'recent-approved' && <RecentApproval />}
            {selectedOption === 'rejected' && <RejectVideos />}
        </div>
  )
}

export default EditorDashboradRight