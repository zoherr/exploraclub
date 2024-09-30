import React from 'react'
import QRCodeScanner from "../../../components/QRCodeScanner"
import AdminProtected from "../../../utils/AdminProtected";

const page = () => {
    return (
        <div>
            <AdminProtected>
                <QRCodeScanner />
            </AdminProtected>
        </div>
    )
}

export default page
