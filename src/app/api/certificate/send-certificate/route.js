import { NextResponse } from "next/server";
import connectDB from "../../../../utils/connectDB";
import nodemailer from "nodemailer";

export const POST = async (req) => {
    try {
        await connectDB();

        // Use FormData to extract the values
        const formData = await req.formData();

        const email = formData.get('email');
        const userName = formData.get('userName');
        const certificateFile = formData.get('certificate');

        // Validate input
        if (!email || !userName || !certificateFile) {
            return NextResponse.json({ success: false, message: "Email, userName, and certificate file are required" }, { status: 400 });
        }

        // Email configuration
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: 'itmbuexploraclub@gmail.com',
                pass: process.env.SMTP_PASSWORD,
            },
        });

        // Create a buffer from the file
        const buffer = await certificateFile.arrayBuffer();
        const attachmentBuffer = Buffer.from(buffer); // Convert to Buffer

        // Prepare email options
        const mailOptions = {
            from: 'itmbuexploraclub@gmail.com',
            to: email,
            subject: 'Your Certificate from Explora Club',
            html: `<p>Hello ${userName},</p>
                   <p>Congratulations on completing your event! Please find your certificate attached.</p>
                   <p>Best Regards,<br>Explora Club Team</p>`,
            attachments: [
                {
                    filename: certificateFile.name || 'certificate.png', // Use the uploaded file name or fallback
                    content: attachmentBuffer, // Use the Buffer here
                    contentType: certificateFile.type || 'image/png', // Set content type, fallback to image/png
                }
            ]
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: "Certificate sent successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error while sending certificate email:", error);
        return NextResponse.json({ success: false, message: "Failed to send certificate. Please try again." }, { status: 500 });
    }
};
