"use client"
import React from 'react'
import ImageUpload from '../../../components/ImageGrid/ImageUpload'
import AdminProtected from "../../../utils/AdminProtected";

const page = () => {
    return (
        <div>
               <AdminProtected>
            <ImageUpload />
            </AdminProtected>
        </div>
    )
}

export default page
