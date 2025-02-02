import React, { useEffect, useState } from 'react'
import thumbnail from '../../../assets/Untitled (2).png';
import VideoComponent from '../editor/VideoComponent';
import axios from 'axios';

const RecentUpload = () => {
    const [videos, setVideos] = useState([]);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchRecentVideos = async () => {
            try {
                const response = await axios.get(`${backendUrl}/video/youtuber/all-videos`, {
                    withCredentials: true,
                });

                if (response.data.success) {
                    setVideos(response.data.video);
                    
                }
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };
        fetchRecentVideos();
    }, []);

    return (
        <div className='flex flex-col gap-6 bg-gray-200 m-4 p-4 rounded-lg'>
            {/* Render all videos */}
            {videos.length > 0 ? videos.map(video => (
              <div key={video._id} className="bg-white p-4 rounded-lg shadow-md">
              <VideoComponent
                  thumbnail={thumbnail}
                  title={video.title}
                  description={video.description}
                  tags={video.tags.length > 0 ? video.tags : ['No Tags']}
                  status={video.status}
                  date={new Date(video.createdAt).toLocaleString()}
              />
             
          </div>
            )) : (
                <p className='text-center text-gray-500 font-bold'>No Uploads found.</p>
            )}
        </div>
    );
};

export default RecentUpload