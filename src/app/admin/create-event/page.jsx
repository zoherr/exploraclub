"use client";
import React from 'react'
import CreateEvent from "../../../components/CreateEve/CreateEvent"
import AdminProtected from "../../../utils/AdminProtected";

const page = () => {
    return (
        <div>
        <AdminProtected>
            <CreateEvent />
        </AdminProtected>
        </div>
    )
}

export default page
