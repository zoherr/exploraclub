"use client"
import axios from "axios"
import React from 'react'
import { redirect } from 'next/navigation';
import { useGetUserInfoQuery } from "../../redux/userApi";
import AdminProtected from "../../utils/AdminProtected";

 const page = () => {

    const handleSendFileToSlack = async () => {
        try {
          const response = await axios.post('/api/slack/send-attendance');
          if (response.data.success) {
            alert('File sent to Slack successfully!');
          } else {
            alert('Failed to send file to Slack.');
          }
        } catch (error) {
          console.error('Error sending file:', error.message);
          alert('Error sending file to Slack.');
        }
      };

  return (
    <div>
        <AdminProtected >
        <button onClick={handleSendFileToSlack}>
  Send Attendance File to Slack
</button>
</AdminProtected>
    </div>
  )
}
export default page
