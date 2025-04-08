import React, { useState } from 'react';
import uploadIcon from '../../../assets/logo/upload.png';
import axios from 'axios';

const EditorUpload = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [videoFile, setVideoFile] = useState(null);
    const [videoSrc, setVideoSrc] = useState(null);
    const [errors, setErrors] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadComplete, setUploadComplete] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'title') {
            setTitle(value);
        } else if (name === 'description') {
            setDescription(value);
        } else if (name === 'tags') {
            setTags(value.split(' '));
        }
    };

    const importVideo = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'video/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                setVideoFile(file);
                const videoURL = URL.createObjectURL(file);
                setVideoSrc(videoURL);
            }
        };
        input.click();
    };

    const uploadVideoToS3 = async (presignedUrl) => {
        try {
            const response = await axios.put(presignedUrl, videoFile, {
                headers: {
                    'Content-Type': 'video/mp4',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            });

            if (response.data.success) {
                setUploadComplete(true)
                console.log("Video successfully uploaded to S3");
                return true;
            }
        } catch (error) {
            console.error("Error uploading video to S3:", error);
            setErrors("Failed to upload video");
            return false;
        }
    };

    const uploadVideo = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!title) newErrors.title = 'Title is required';
        if (!description) newErrors.description = 'Description is required';
        if (tags.length === 0) newErrors.tags = 'Tags are required';
        if (!videoFile) newErrors.videoFile = 'Video file is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setUploading(true);

        try {
            
            const metadataResponse = await axios.post(`${backendUrl}/video/editor/upload`, {
                title,
                description,
                tags,
                fileName: videoFile.name,
            }, {
                withCredentials: true
            });

            if (!metadataResponse.data.success) {
                throw new Error("Failed to get presigned URL");
            }

            const { uploadPresignedUrl, videoId } = metadataResponse.data;

            const uploadSuccess = await uploadVideoToS3(uploadPresignedUrl);

            if (uploadSuccess) {
                setTitle('');
                setDescription('');
                setTags([]);
                setVideoFile(null);
                setVideoSrc(null);
                setUploadProgress(0);
                setUploadComplete(false);
            }

        } catch (error) {
            console.error(error);
            setErrors("Upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className='p-6 md:p-10'>
            <h1 className='text-2xl font-sans font-semibold'>Upload a new Video</h1>
            <div
                className='border-2 border-dashed border-blue-400 flex flex-col items-center rounded-lg px-10 py-14 my-5 bg-neutral-200 relative cursor-pointer'
                onClick={importVideo}
            >
                {videoSrc ? (
                    <video controls className="w-full h-auto mb-6 rounded-xl">
                        <source src={videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <>
                        <img src={uploadIcon} alt="Upload icon" className='size-14 mb-6' />
                        <p className='absolute bottom-0 mb-2 text-center'>Click to open file <br />or <span className='text-blue-400'>Drag and drop file</span></p>
                    </>
                )}
            </div>
                {errors &&(<p className='text-red-600 text-lg text-center pb-2'>{errors.videoFile}</p>)}

            <div className='bg-neutral-200 px-6 py-6 rounded-lg'>
                <form className='flex flex-col gap-3' onSubmit={uploadVideo}>
                    <div className='flex flex-col gap-3'>
                        <label>Title <span className='text-red-500'>*</span></label>
                        <input type="text"
                            className="rounded-md py-2 px-3 leading-tight outline-none"
                            name="title"
                            placeholder="Title of the video"
                            onChange={handleInputChange}
                        />
                        {errors &&(<p className='text-red-600 text-sm'>{errors.title}</p>)}
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label>Description <span className='text-red-500'>*</span></label>
                        <input type="text"
                            className="rounded-md py-2 px-3 leading-tight outline-none"
                            name="description"
                            placeholder="Description of the video"
                            onChange={handleInputChange}
                        />
                        {errors &&(<p className='text-red-600 text-sm'>{errors.description}</p>)}
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label>Tags <span className='text-red-500'>*</span></label>
                        <input type="text"
                            className="rounded-md py-2 px-3 leading-tight outline-none"
                            name="tags"
                            placeholder="Tags (space separated)"
                            onChange={handleInputChange}
                        />
                        {errors &&(<p className='text-red-600 text-sm'>{errors.tags}</p>)}
                    </div>

                    <div className='flex justify-center'>
                        <button
                            className='bg-blue-500 px-6 py-2 rounded-lg mt-5 text-white font-sans font-semibold'
                            type='submit'
                            disabled={uploading}
                        >
                            {uploading ? "Uploading..." : "Upload Video"}
                        </button>
                    </div>
                </form>
            </div>
            {uploading && (
                <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50'>
                    <div className='bg-white w-1/2 h-1/2 p-6 flex flex-col justify-center items-center rounded-lg shadow-lg'>
                        <h2 className='text-xl font-semibold mb-4'>{uploadComplete ? "Upload Complete!" : "Uploading Video..."}</h2>
                        <div className='w-3/4 bg-gray-200 rounded-full h-4 overflow-hidden'>
                            <div
                                className='bg-blue-500 h-4 transition-all duration-300'
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                        </div>
                        <p className='mt-3 text-lg'>{uploadProgress}%</p>
                        
                    </div>
                </div>
            )}
        </div>
    );
}

export default EditorUpload;