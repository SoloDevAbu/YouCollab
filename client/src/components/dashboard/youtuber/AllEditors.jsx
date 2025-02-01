import React, { useEffect, useState } from 'react'
import EditorProfileCard from './EditorProfileCard'
import plusIcon from '../../../assets/logo/plus.png'
import axios from 'axios';

const AllEditors = () => {
    const [editors, setEditros] = useState([]);
    const [addingEditor, setAddingEditor] = useState(false);
    const [editorEmail, setEditorEmail] = useState(null);


    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchEditors = async () => {
            try {
                const response = await axios.get(`${backendUrl}/youtuber/editors`, {
                    withCredentials: true,
                });

                if (response.data.success) {
                    setEditros(response.data.editors);
                    console.log(response.data.editors);
                }
            } catch (error) {
                console.error('Error fetching editors:', error);
            }
        }
        fetchEditors();
    }, []);

    const handleEditorEmail = (e) => {
        setAddingEditor(true);
    }
    
    const addEditors = () => {
        const addEditor = async () => {
            try {
                const response = await axios.put(`${backendUrl}/youtuber/add-editor`, {
                    editorEmail
                }, {
                    withCredentials: true
                })
                if (response.data.success) {
                    const updatedResponse = await axios.get(`${backendUrl}/youtuber/editors`, {
                        withCredentials: true,
                    });
                    
                    if (updatedResponse.data.success) {
                        setEditros(updatedResponse.data.editors);
                    }
                }
            } catch (error) {
                console.error('Error adding editor:', error);
            }
        }
        addEditor();
        setAddingEditor(false);
    }

    const removeEditor = (editorId) => {
        const deleteEditor = async () => {
            try {
                const response = await axios.put(`${backendUrl}/youtuber/remove-editor/${editorId}`,
                    {},
                     {
                    withCredentials: true,
                });

                if (response.data.success) {
                    const updatedResponse = await axios.get(`${backendUrl}/youtuber/editors`, {
                        withCredentials: true,
                    });

                    if (updatedResponse.data.success) {
                        setEditros(updatedResponse.data.editors);
                    }
                }
            } catch (error) {
                console.error('Error removing editor:', error);
            }
        }
        deleteEditor();
    }

    return (
        <>
            <div className='flex flex-col gap-6 bg-gray-200 m-4 p-4 rounded-lg'>
                {editors.length > 0 ? (
                    editors.map((editor) => (
                        <div key={editor._id} className='m-2'>
                            <EditorProfileCard name={editor.name} email={editor.email} onClick={() => removeEditor(editor._id)} />
                        </div>
                    ))
                ) :
                    <p className='text-center text-gray-500 font-bold'>No Editors.</p>
                }
            </div>

            <div className='flex justify-center'>
                <button className='bg-blue-500 px-10 py-2 rounded-lg'
                    onClick={handleEditorEmail}
                >
                    <img src={plusIcon} alt="Add Editors" className='h-5' />
                </button>
            </div>

            {addingEditor && (
                <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
                    <div className='bg-white p-4 rounded-lg shadow-lg'>
                        <input className='border-b-2 w-full py-2 px-4 focus:outline-none'
                            type="email"
                            placeholder='Enter Editor Email'
                            onChange={(e) => setEditorEmail(e.target.value)}
                        />
                        <div className='flex justify-center gap-4 mt-4'>
                            <button className='bg-red-500 px-4 py-2 rounded-lg text-white font-bold'
                                onClick={() => setAddingEditor(false)}
                            >Cancel</button>
                            <button className='bg-blue-500 px-4 py-2 rounded-lg text-white font-bold'
                                onClick={addEditors}
                            >Add</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default AllEditors