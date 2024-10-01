"use client"
import React from 'react'
import ManageEvent from "../../../components/MnageEvent/index"
import AdminProtected from "../../../utils/AdminProtected";

const page = () => {
  return (
    <div>
           <AdminProtected>
<ManageEvent />
</AdminProtected>
    </div>
  )
}

export default page
