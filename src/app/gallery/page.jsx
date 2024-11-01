"use client";
import React, { useEffect, useState } from 'react';
import ImageGrid from '../../components/ImageGrid/ImageGrid';
import axios from 'axios';
import Loader from "../../components/Loading"
const Page = () => {
  const [images, setImages] = useState([]); // State to hold images
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('/api/gallary'); // Adjust the endpoint as needed
        if (response.data.success) {
            setImages(response.data.data); // Set images to the data array
          } // Set the fetched images to state
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <Loader/>; // Loading state
  }

  return (
    <div className='px-5 mt-8'>
      {/* <h1>Image Library</h1> */}
      <ImageGrid images={images} /> {/* Pass fetched images to ImageGrid */}
    </div>
  );
};

export default Page;
