"use client";
import React, { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const QRCodeScanner = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [prevScannedData, setPrevScannedData] = useState(null);
    const [scannedData, setScannedData] = useState(null);
    const [isScanning, setIsScanning] = useState(false); // Add scan lock
    const scanInterval  = 2000; // 2 seconds delay to prevent multiple scans
    const [lastScannedTime, setLastScannedTime] = useState(0);  // Track the last scan timestamp

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then((stream) => {
                video.srcObject = stream;
                video.setAttribute('playsinline', true);
                video.play();
                requestAnimationFrame(tick);
            });

        const tick = () => {
            const currentTime = new Date().getTime();
            if (video.readyState === video.HAVE_ENOUGH_DATA && !isScanning && currentTime - lastScannedTime > scanInterval) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, canvas.width, canvas.height);

                if (code && !isScanning) {
                    setIsScanning(true);  // Prevent multiple scans
                    setScannedData(code.data);

                        markAttendance(code.data);


                    setLastScannedTime(currentTime);
                  }
                }
                requestAnimationFrame(tick);
              };
            }, [isScanning,lastScannedTime,scannedData]);

    const markAttendance = async (qrCode) => {
        try {

            if (prevScannedData !== scannedData) {
            const response = await axios.post('/api/attendence', { qrCode: qrCode });
            setPrevScannedData(qrCode);// Wrap qrCode in an object
            toast.success("Scanned");
            }

        } catch (error) {
            // console.log(error);
            // toast.error("Error");
        } finally {
            // Allow scanning again after the request completes
            setTimeout(() => {
              setIsScanning(false);  // Re-enable scanning after the request is done
            }, scanInterval);  // Delay subsequent scans by the interval
          }
        };



    return (
        <div>
            <h2 className='text-center mt-9'>Scan the QR Code</h2>
            {/* <Toaster position="top-right" /> */}
            {scannedData && <p className='text-center mt-9'>Scanned QR Code: {scannedData}</p>}
            <div className="flex justify-center rounded-2xl  overflow-hidden my-10">
            <video ref={videoRef} style={{ width: '80%',height:"100%",borderRadius:"20px" }} />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
        </div>
    );
};

export default QRCodeScanner;
