"use client";
import dynamic from 'next/dynamic'
import React, { useState } from 'react';
// import QrReader  from 'react-qr-scanner';
import toast from 'react-hot-toast';
import axios from 'axios';

const QrReader = dynamic(() => import('react-qr-scanner'), { ssr: false });

const QRCodeScanner = () => {
    const [scannedData, setScannedData] = useState(null);
    const [scannedCodesSet, setScannedCodesSet] = useState(new Set()); // Store unique scanned codes

    const handleScan = async (data) => {
        if (data) {
            const qrCode = data.text;
            // Check if the QR code was already scanned
            if (!scannedCodesSet.has(qrCode)) {
                setScannedData(qrCode);
                markAttendance(qrCode); // Call API to mark attendance
            }
        }
    };

    const handleError = (err) => {
        // console.error(err);
        toast.error("Error scanning QR code");
    };

    const markAttendance = async (qrCode) => {
        setScannedCodesSet(prevSet => new Set(prevSet).add(qrCode)); // Add the QR code to the set
        try {
            const response = await axios.post('/api/attendence', { qrCode:qrCode });
            toast.success("Attendance marked for QR Code");
        } catch (error) {
            // console.error("Error during attendance marking:", error);
            toast.error("Error marking attendance: " + (error.response ? error.response.data.message : "Unknown error"));
        }
    };

    return (
        <div>
            <h2 className='text-center mt-9'>Scan the QR Code</h2>
            {scannedData && <p className='text-center mt-9'>Last Scanned QR Code: {scannedData}</p>}
            <div className="flex justify-center rounded-2xl overflow-hidden my-10">
                <QrReader
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '80%', height: 'auto',borderRadius: "20px"}}
                />
            </div>
        </div>
    );
};

export default QRCodeScanner;
