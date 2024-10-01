"use client";
import React, { useState } from 'react';
import axios from 'axios';
import upload from '../../utils/upload';
import toast from 'react-hot-toast';

const ImageUpload = () => {
  const [eventImages, setEventImages] = useState([]); // State for storing uploaded event images
  const [files, setFiles] = useState([]); // State for the selected files
  const [uploadingImages, setUploadingImages] = useState(false);

  // Multiple file input change handler
  const handleMultipleFileChange = (e) => {
    setFiles(e.target.files); // Set the selected files
  };

  // Upload function for additional event images
  const handleUploadImages = async () => {
    setUploadingImages(true);
    try {
      // Upload multiple event images
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file); // Assuming upload function returns the URL
          return url;
        })
      );

      // Send URLs to the backend
      const response = await axios.post('/api/gallary', { urls: images }); // Adjust the endpoint as needed

      if (response.data) {
        toast.success('Images uploaded successfully!');
        setEventImages(images); // Update state with uploaded image URLs
      }
      setUploadingImages(false);
    } catch (err) {
      console.error('Error during event images upload:', err);
      setUploadingImages(false);
      toast.error('Error uploading images.'); // Error message
    }
  };

  return (
    <div className=' flex justify-center'>
        <div className="">
        <h1 className='text-[24px] mb-10 block text-lg font-medium leading-6 text-[#000] mt-8 NeueMontreal-Regular text-center'>Uplaod Images to Gallary</h1>
        <div className="bg-[#004D43] px-5 sm:py-10 py-24 rounded-xl flex-col justify-around">
        <label className='text-[14px] text-center block text-lg font-medium leading-6 text-[#fff] mb-8 NeueMontreal-Regular'>Upload  Images:</label>
      <input
        type="file"
        multiple
        onChange={handleMultipleFileChange}
        className='text-white'
      />
      <br />
      <div className="flex justify-center mt-9">
      <button className='mt-2 bg-[#EBFF57] text-[#29292B] rounded-xl px-4 py-2' onClick={handleUploadImages}>
        {uploadingImages ? "Uploading..." : "Upload Images"}
      </button>
      </div>
        </div>

        </div>


    </div>
  );
};

export default ImageUpload;
