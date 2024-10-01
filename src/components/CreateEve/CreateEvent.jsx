"use client";
import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import upload from '../../utils/upload';
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import toast from 'react-hot-toast';
const CreateEvent = () => {
    const [eventDetails, setEventDetails] = useState({
        isCompleted: false,
        name: "",
        description: "",
        feedback: "",
        shortDesc: "",
        date: "",
        time: "",
        location: "",
        semester: "",
        teamMember: 1,
        image: "",
        winner: "",
        eventImages: [""],
    });

    const [singleFile, setSingleFile] = useState(undefined); // For the cover image
    const [files, setFiles] = useState([]); // For additional images
    const [uploadingCover, setUploadingCover] = useState(false);
    const [uploadingImages, setUploadingImages] = useState(false);

    // Handle description change using ReactQuill
    const handleQuillChange = (content) => {
        setEventDetails({ ...eventDetails, description: content });
    };

    // Single file (cover image) input change handler
    const handleSingleFileChange = (e) => {
        setSingleFile(e.target.files[0]); // Set cover image
    };

    // Multiple file (event images) input change handler
    const handleMultipleFileChange = (e) => {
        setFiles(e.target.files); // Set multiple images
    };

    // Upload function for the cover image
    const handleUploadCover = async () => {
        setUploadingCover(true);
        try {
            // Upload cover image
            const cover = await upload(singleFile);
            setEventDetails({ ...eventDetails, image: cover });
            setUploadingCover(false);
        } catch (err) {
            console.error('Error during cover image upload:', err);
            setUploadingCover(false);
        }
    };

    // Upload function for the additional event images
    const handleUploadImages = async () => {
        setUploadingImages(true);
        try {
            // Upload multiple event images
            const images = await Promise.all(
                [...files].map(async (file) => {
                    const url = await upload(file);
                    return url;
                })
            );
            setEventDetails({ ...eventDetails, eventImages: images });
            setUploadingImages(false);
        } catch (err) {
            console.error('Error during event images upload:', err);
            setUploadingImages(false);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send event details to the backend API
            const response = await axios.post('/api/events', eventDetails); // Adjust the endpoint as needed
            if (response.data.success) {
                toast.success("Event created successfully!")
            } else {
                toast.error('Failed to create event.');
            }
        } catch (error) {
            console.error('Error creating event:', error);
            toast.error('An error occurred while creating the event.');
        }
    };

    return (
        <div className="mt-5 mb-16 NeueMontreal-Regular px-8 sm:px-16">
            <h1 className='text-center text-2xl sm:text-6xl mt-7 NeueMontreal-Regular'>Create Event</h1>
            <form onSubmit={handleSubmit}>
                <div className="sm:flex mt-5 sm:mt-10">
                    <div className="sm:w-1/2 sm:px-8">
                        <label className="text-[14px] block text-lg font-medium leading-6 text-[#000] mt-8 NeueMontreal-Regular" htmlFor='name'>
                            Event Name:
                        </label>
                        <input
                            value={eventDetails.name}
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Byte Hunt"
                            className="w-full text-black bg-white border border-black rounded h-[40px] px-2 outline-none mt-[10px]"
                            onChange={(e) => setEventDetails({ ...eventDetails, name: e.target.value })}
                        />

                        <label className="text-[14px] mb-2 block text-lg font-medium leading-6 text-[#000] mt-8 NeueMontreal-Regular">Event Description:</label>
                        <div className="min-h-[21.8rem] border h-[20rem] overflow-scroll">
                            <ReactQuill
                                value={eventDetails.description}
                                onChange={handleQuillChange}
                                theme="snow"
                            />
                        </div>
                        <label className="text-[14px] block text-lg font-medium leading-6 text-[#000] mt-8 NeueMontreal-Regular" htmlFor='name'>
                            Event Short Desc:
                        </label>
                        <input
                            value={eventDetails.shortDesc}
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Byte Hunt"
                            className="w-full text-black bg-white border border-black rounded h-[40px] px-2 outline-none mt-[10px]"
                            onChange={(e) => setEventDetails({ ...eventDetails, shortDesc: e.target.value })}
                        />
                        <label className="text-[14px] block text-lg font-medium leading-6 text-[#000] mt-8 NeueMontreal-Regular">Event Completed:</label>
                        <select
                            className="mt-2 block w-full border border-gray-300 rounded-md p-2"
                            onChange={(e) => setEventDetails({ ...eventDetails, isCompleted: e.target.value === 'true' })}
                            value={eventDetails.isCompleted}
                        >
                            <option value={true}>Completed</option>
                            <option value={false}>Not Completed</option>
                        </select>
                        {eventDetails.isCompleted && (
                            <>
                                <label className="text-[14px] block text-lg font-medium leading-6 text-[#000] mt-8 NeueMontreal-Regular">
                                    Winner:
                                </label>
                                <input
                                    type="text"
                                    value={eventDetails.winner}
                                    onChange={(e) => setEventDetails({ ...eventDetails, winner: e.target.value })}
                                    className="w-full bg-white border border-black rounded h-[40px] px-2 outline-none mt-[10px]"
                                    placeholder="Enter the winner's name"
                                />
                            </>
                        )}
                    </div>

                    <div className="sm:w-1/2 sm:px-8">


                        {eventDetails.isCompleted && (
                            <>
                                <label className="text-[14px] block text-lg font-medium leading-6 text-[#000] mt-8 NeueMontreal-Regular">
                                    Feedback & Conclusion:
                                </label>
                                <input
                                    type="text"
                                    value={eventDetails.feedback}
                                    onChange={(e) => setEventDetails({ ...eventDetails, feedback: e.target.value })}
                                    className="w-full bg-white border border-black rounded h-[40px] px-2 outline-none mt-[10px]"
                                    placeholder="Feedback & Conclusion:"
                                />
                            </>
                        )}
                        <label className="text-[14px] block text-lg font-medium leading-6 text-[#000] mt-8 NeueMontreal-Regular">Event Date:</label>
                        <input
                            type="date"
                            value={eventDetails.date}
                            onChange={(e) => setEventDetails({ ...eventDetails, date: e.target.value })}
                            className="w-full bg-white border border-black rounded h-[40px] px-2 outline-none mt-[10px]"
                        />
                        <label className="text-[14px] block text-lg font-medium leading-6 text-[#000] mt-8 NeueMontreal-Regular">Event Time:</label>
                        <input
                            type="time"
                            value={eventDetails.time}
                            onChange={(e) => setEventDetails({ ...eventDetails, time: e.target.value })}
                            className="w-full bg-white border border-black rounded h-[40px] px-2 outline-none mt-[10px]"
                        />

                        <label className="text-[14px] block text-lg font-medium leading-6 text-[#000] mt-8 NeueMontreal-Regular">Location:</label>
                        <input
                            type="text"
                            value={eventDetails.location}
                            onChange={(e) => setEventDetails({ ...eventDetails, location: e.target.value })}
                            className="w-full bg-white border border-black rounded h-[40px] px-2 outline-none mt-[10px]"
                        />

                        <label className="text-[14px] block text-lg font-medium leading-6 text-[#000] mt-8 NeueMontreal-Regular">Team Members Allowed:</label>
                        <input
                            type="number"
                            value={eventDetails.teamMember}
                            onChange={(e) => setEventDetails({ ...eventDetails, teamMember: e.target.value })}
                            className="w-full bg-white border border-black rounded h-[40px] px-2 outline-none mt-[10px]"
                        />

                        <label className={`text-[14px] block text-lg font-medium leading-6 text-[#000] mt-8 NeueMontreal-Regular`} htmlFor='semester'>
                            Semester:
                        </label>
                        <select onChange={(e) => setEventDetails({ ...eventDetails, semester: e.target.value })} value={eventDetails.semester} name="semester" id="semester" className="rounded border border-black w-full mt-[10px] h-[40px]">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                        <label className="text-[14px] block text-lg font-medium leading-6 text-[#000] mt-8 NeueMontreal-Regular">Upload Cover Image:</label>
                        <div className="sm:flex justify-between">
                            <input
                                type="file"
                                onChange={handleSingleFileChange}
                                className="w-full sm:w-1/2 flex items-center bg-white  rounded h-[40px] px-2 outline-none mt-[10px]"
                            />
                            <button
                                type="button"
                                className="mt-[10px] sm:ml-4 bg-black text-white rounded px-4 py-2"
                                onClick={handleUploadCover}
                            >
                                {uploadingCover ? "Uploading..." : "Upload"}
                            </button></div>

                        <label className="text-[14px] block text-lg font-medium leading-6 text-[#000] mt-8 NeueMontreal-Regular">Upload Additional Images:</label>
                        <div className="sm:flex justify-between">
                            <input
                                type="file"
                                multiple
                                onChange={handleMultipleFileChange}
                                className="w-full sm:w-1/2 flex items-center bg-white  rounded h-[40px] px-2 outline-none mt-[10px]"
                            />
                            <button
                                type="button"
                                className="mt-[10px] sm:ml-4 bg-black text-white rounded px-4 py-2"
                                onClick={handleUploadImages}
                            >
                                {uploadingImages ? "Uploading..." : "Upload"}
                            </button></div>

                    </div>
                </div>

                <div className="flex justify-center ">
                            <button type="submit" className="mt-10 bg-black text-white w-full rounded h-[40px] hover:bg-gray-800">Create Event</button>
                        </div>

            </form>
        </div>
    );
};

export default CreateEvent;
