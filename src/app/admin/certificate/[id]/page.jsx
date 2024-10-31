"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../../../../components/Loading';

const Page = ({ params }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [files, setFiles] = useState({});

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`/api/certificate/${params.id}`);
                if (response.data.success) {
                    setUsers(response.data.data);
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

    const sendCertificate = async (userId) => {
        if (!files[userId]) {
            toast.error("Please upload a certificate before sending.");
            return;
        }

        const formData = new FormData();
        formData.append("email", users.find(user => user.id === userId).email);
        formData.append("userName", users.find(user => user.id === userId).userName);
        formData.append("certificate", files[userId]);

        try {
            const response = await axios.post("/api/certificate/send-certificate", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (response.data.success) {
                toast.success("Certificate sent successfully!");
            } else {
                toast.error("Failed to send certificate.");
            }
        } catch (error) {
            console.error("Error sending certificate:", error);
            toast.error("An error occurred while sending the certificate.");
        }
    };

    if (loading) return <Loader/>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">Users Who Attended</h2>
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
    );
};

export default Page;
