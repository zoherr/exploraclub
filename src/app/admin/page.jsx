"use client"
import axios from "axios"
import React from 'react'
import { redirect } from 'next/navigation';
import { useGetUserInfoQuery } from "../../redux/userApi";
import AdminProtected from "../../utils/AdminProtected";
import Link from 'next/link';
import { MdOutlineDocumentScanner } from "react-icons/md";
import { IoCreate } from "react-icons/io5";
import { VscTools } from "react-icons/vsc";
import { MdAddAPhoto } from "react-icons/md";

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
                <div className="flex justify-center mt-9">
                    <div className="">
                        <Link href="/admin/scan" className="">
                            <div className="my-5 sm:hidden block px-5 bg-[#29292B] py-5 text-white rounded-full">
                                <h1 className="text-xl flex items-center justify-center gap-5" >Scan Attendance <MdOutlineDocumentScanner className="text-2xl" />
                                </h1>
                            </div>
                        </Link>

                        <Link href="/admin/create-event" className="">
                            <div className="my-5  px-5 bg-[#29292B] py-5 text-white rounded-full">
                                <h1 className="text-xl flex items-center justify-center gap-5" >Create Event
                                    <IoCreate className="text-2xl" />
                                </h1>
                            </div>
                        </Link>

                        <Link href="/admin/manage-event" className="">
                            <div className="my-5  px-5 bg-[#29292B] py-5 text-white rounded-full">
                                <h1 className="text-xl flex items-center gap-5 justify-center" >Manage Event
                                    <VscTools className="text-2xl" />

                                </h1>
                            </div>
                        </Link>

                        <Link href="/admin/add-images" className="">
                            <div className="my-5  px-5 bg-[#29292B] py-5 text-white rounded-full">
                                <h1 className="text-xl flex items-center gap-5 justify-center" >Add Images
                                    <MdAddAPhoto className="text-2xl" />

                                </h1>
                            </div>
                        </Link>
                    </div>

                </div>

            </AdminProtected>
        </div>
    )
}
export default page
