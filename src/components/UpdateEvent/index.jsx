"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router'; // For fetching ID from the URL
import upload from '../../utils/upload';
import toast from 'react-hot-toast';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import Loader from '../Loading';

const UpdateEvent = ({id}) => {


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
    winner: "",
    eventImages: [""],
  });

  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [loading, setLoading] = useState(true); // State to manage loading

  // Fetch existing event details
  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        try {
          const response = await axios.get(`/api/events/${id}`);
          setEventDetails(response.data.data);
        } catch (error) {
          console.error('Error fetching event:', error);
        } finally {
            setLoading(false); // Set loading to false after fetching
          }
      };

      fetchEvent();
    }
  }, [id]);

  // Handle description change using ReactQuill
  const handleQuillChange = (content) => {
    setEventDetails({ ...eventDetails, description: content });
  };

  const handleSingleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
  };

  const handleMultipleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUploadCover = async () => {
    setUploadingCover(true);
    try {
      const cover = await upload(singleFile);
      setEventDetails({ ...eventDetails, image: cover });
      setUploadingCover(false);
    } catch (err) {
      console.error('Error during cover image upload:', err);
      setUploadingCover(false);
    }
  };

  const handleUploadImages = async () => {
    setUploadingImages(true);
    try {
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

  // Handle form submission for updating event
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/events/${id}`, eventDetails); // PUT request to update the event
      if (response.data.success) {
        toast.success("Event updated successfully!");
      } else {
        toast.error('Failed to update event.');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('An error occurred while updating the event.');
    }
  };


  return (
    <div className="mt-5 mb-16 NeueMontreal-Regular px-8 sm:px-16">
      <h1 className='text-center text-2xl sm:text-6xl mt-7 NeueMontreal-Regular'>Update Event</h1>
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

            {/* Other form fields for updating the event */}
            <label className="text-[14px] block text-lg font-medium leading-6 text-[#000] mt-8 NeueMontreal-Regular" htmlFor='shortDesc'>
              Event Short Desc:
            </label>
            <input
              value={eventDetails.shortDesc}
              type="text"
              name="shortDesc"
              id="shortDesc"
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
          </div>

          <div className="sm:w-1/2 sm:px-8">
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

                <label className="text-[14px] block text-lg font-medium leading-6 text-[#000] mt-8 NeueMontreal-Regular">
                  Feedback & Conclusion:
                </label>
                <input
                  type="text"
                  value={eventDetails.feedback}
                  onChange={(e) => setEventDetails({ ...eventDetails, feedback: e.target.value })}
                  className="w-full bg-white border border-black rounded h-[40px] px-2 outline-none mt-[10px]"
                  placeholder="Feedback & Conclusion"
                />
              </>
            )}

            {/* Event Date and Time */}
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

            <label className="text-[14px] block text-lg font-medium leading-6 text-[#000] mt-8 NeueMontreal-Regular">Upload Event Images:</label>
            <div className="sm:flex justify-between">
              <input
                type="file"
                multiple
                onChange={handleMultipleFileChange}
                className="w-full sm:w-1/2 flex items-center bg-white rounded h-[40px] px-2 outline-none mt-[10px]"
              />
              <button
                type="button"
                onClick={handleUploadImages}
                disabled={uploadingImages}
                className="mt-[10px] sm:ml-4 bg-black text-white rounded px-4 py-2"
              >
                {uploadingImages ? 'Uploading...' : 'Upload Images'}
              </button>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="mt-10 bg-black text-white w-full rounded h-[40px] hover:bg-gray-800"
            >
              Update Event
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateEvent;
