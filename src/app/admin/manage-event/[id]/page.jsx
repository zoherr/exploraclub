"use client"
import React from 'react'
import UpdateEvent from "../../../../components/UpdateEvent/index"
import AdminProtected from "../../../../utils/AdminProtected";

const page = ({params}) => {
  return (
    <div> <AdminProtected>
<UpdateEvent id={params.id} />
</AdminProtected>
    </div>
  )
}

export default page
