import React, { useEffect, useState } from 'react'
import VideoComponent from './VideoComponent'
import thumbnail from '../../../assets/Untitled (2).png'
import axios from 'axios';

const PendingApproval = () => {
  const [videos, setVideos] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchRecentApprovedVideos = async () => {
      try {
        const response = await axios.get(`${backendUrl}/video/editor/videos`, {
          withCredentials: true,
        });

        if (response.data.success) {
          setVideos(response.data.video);
        }
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchRecentApprovedVideos();
  }, []);

  return (
    <div className='flex flex-col gap-6 bg-gray-200 m-4 p-4 rounded-lg'>
      {videos.filter(video => video.status === "PENDING").length > 0 ? (
        videos
          .filter(video => video.status === "PENDING")
          .map(video => (
            <div key={video._id} className="bg-white p-4 rounded-lg shadow-md">
              <VideoComponent
                thumbnail={thumbnail}
                title={video.title}
                description={video.description}
                tags={video.tags.length > 0 ? video.tags : ['No Tags']}
                status={video.status}
              />
            </div>
          ))
      ) : (
        <p className="text-center text-gray-500 font-bold">No pending videos available.</p>
      )}
    </div>


  );
}

export default PendingApproval