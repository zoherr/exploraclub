"use client"
import React from 'react'
import QRCodeScanner from "../../../components/QRCodeScanner"
import VolunteerProtected from "../../../utils/VolunteerProtected";

const page = () => {
    return (
        <div>
            {/* <VolunteerProtected> */}
                <QRCodeScanner />
            {/* </VolunteerProtected> */}
        </div>
    )
}

export default page
