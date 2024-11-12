'use client';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { isMobile } from 'react-device-detect';


// Dynamically import 'QrReader'
const QrReader = dynamic(() => import('react-qr-scanner'), {
  ssr: false,
  loading: () => <p>Loading QR Scanner...</p>,
});

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
        toast.error("Error scanning QR code");
    };

    const markAttendance = async (qrCode) => {
        setScannedCodesSet(prevSet => new Set(prevSet).add(qrCode)); // Add the QR code to the set
        try {
            await axios.post('/api/attendence', { qrCode });
            toast.success("Attendance marked for QR Code");
        } catch (error) {
            toast.error("Error marking attendance: " + (error.response ? error.response.data.message : "Unknown error"));
        }
    };

    return (
        <div>
            <h2 className="text-center mt-9">Scan the QR Code</h2>
            {scannedData && <p className="text-center mt-9">Last Scanned QR Code: {scannedData}</p>}
            <div className="flex justify-center rounded-2xl overflow-hidden my-10">
                <QrReader
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '80%', height: 'auto', borderRadius: "20px" }}
                    constraints={{
                        video: {
                          facingMode: 'environment'  // Use back camera for mobile devices
                        }
                      }} // Use correct facing mode for mobile/desktop
                />
            </div>
        </div>
    );
};

export default QRCodeScanner;
