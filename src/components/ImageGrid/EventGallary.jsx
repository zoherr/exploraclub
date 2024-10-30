"use client";
import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import Image from 'next/image';
import styles from './ImageGrid.module.css';

const EventGallery = ({ images }) => {
  const [imageDimensions, setImageDimensions] = useState([]);

  // Function to load image dimensions dynamically
  const getImageDimensions = (url, index) => {
    const img = new window.Image();
    img.src = url;
    img.onload = () => {
      setImageDimensions((prev) => {
        const newDims = [...prev];
        newDims[index] = { width: img.naturalWidth, height: img.naturalHeight };
        return newDims;
      });
    };
  };

  useEffect(() => {
    // Get dimensions for all images on initial load
    images.forEach((image, index) => getImageDimensions(image, index));
  }, [images]);

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 2,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.masonryGrid}
      columnClassName={styles.masonryGridColumn}
    >
      {images.map((image, index) => (
        <div key={index} className={styles.imageItem}>
          {imageDimensions[index] ? (
            <Image
              src={image}
              alt={`Event Image ${index + 1}`}
              width={imageDimensions[index].width}
              height={imageDimensions[index].height}
              layout="responsive"
              className="rounded-xl"
            />
          ) : (
            // Placeholder while loading image dimensions
            <div className={styles.placeholder}></div>
          )}
        </div>
      ))}
    </Masonry>
  );
};

export default EventGallery;
