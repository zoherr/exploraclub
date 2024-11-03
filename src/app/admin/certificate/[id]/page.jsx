"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../../../../components/Loading';
import AdminProtected from "../../../../utils/AdminProtected";

const Page = ({ params }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false)
    const [fileSending, setFileSending] = useState(false)

    const [files, setFiles] = useState({});

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`/api/certificate/${params.id}`);
                if (response.data.success) {
                    setUsers(response.data.data);
                    console.log(response.data.data);

                }
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [params.id]);

    const handleFileChange = (userId, file) => {
        setFiles((prevFiles) => ({ ...prevFiles, [userId]: file }));
    };
    const handleSendFileToSlack = async () => {
        try {
            setFileSending(true);
            const response = await axios.post('/api/slack/slack-certificate', { eventId: params.id });
            if (response.data.success) {
                toast.success('File sent to Slack successfully!');
            } else {
                toast.error('Failed to send file to Slack.');
            }
        } catch (error) {
            console.error('Error sending file:', error.message);
            alert('Error sending file to Slack.');
        } finally {
            setFileSending(false);
        }
    };
    const sendCertificate = async (userId) => {
        if (!files[userId]) {
            toast.error("Please upload a certificate before sending.");
            return;
        }

        const formData = new FormData();
        const user = users.find(user => user.id === userId);
        formData.append("eventId", params.id);
        formData.append("userId", user.userId);
        formData.append("email", user.email);
        formData.append("userName", user.userName);
        formData.append("certificate", files[userId]);

        try {
            const response = await axios.post("/api/certificate/send-certificate", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (response.data.success) {
                setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
                toast.success("Certificate sent successfully!");
            } else {
                toast.error("Failed to send certificate.");
            }
        } catch (error) {
            console.error("Error sending certificate:", error);
            toast.error("An error occurred while sending the certificate.");
        }

    };

    if (loading) return <Loader />;

    return (
        <AdminProtected>
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">Users Who Attended</h2>
            <button
               onClick={() => handleSendFileToSlack()}
              className="mt-10 bg-black my-5 text-white w-[23%] rounded h-[40px] hover:bg-gray-800"
            >

              {fileSending ? "Sending to Slack" :" Send All Attend User Details"  }
            </button>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2 text-left">Name</th>
                            {/* <th className="p-2 text-left">Email</th> */}
                            <th className="p-2 text-left">Upload Certificate</th>
                            <th className="p-2 text-left">Send</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b border-gray-300">
                                <td className="p-2">{user.userName}</td>
                                {/* <td className="p-2">{user.email}</td> */}
                                <td className="p-2">
                                    <input
                                        type="file"
                                        accept="image/png"
                                        onChange={(e) => handleFileChange(user.id, e.target.files[0])}
                                        className="border border-gray-300 rounded p-1"
                                    />
                                </td>
                                <td className="p-2">
                                    <button
                                        onClick={() => sendCertificate(user.id)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                    >
                                    Send Certificate
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </AdminProtected>
    );
};

export default Page;
