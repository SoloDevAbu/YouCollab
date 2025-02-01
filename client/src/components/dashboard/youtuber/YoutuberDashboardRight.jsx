import React from 'react'
import RecentUpload from './RecentUpload'
import AllUploads from './AllUploads'
import PendingApproval from './PendingApproval'
import Approved from './Approved'
import Rejected from './Rejected'

const YoutuberDashboardRight = ({selectedOption}) => {
  return (
    <div>
      {selectedOption === 'recent-uploads' && <RecentUpload/>}
      {selectedOption === 'all-uploads' && <AllUploads/>}
      {selectedOption === 'pending-approval' && <PendingApproval/>}
      {selectedOption === 'approved' && <Approved/>}
      {selectedOption === 'rejected' && <Rejected/>}
    </div>
  )
}

export default YoutuberDashboardRight