import nodemailer from 'nodemailer';
import User from '../../../../models/user.models';
import Event from '../../../../models/event.model';
import connectDB from "../../../../utils/connectDB";
import { NextResponse } from 'next/server';

connectDB();
export const POST = async (req, res) => {
    const { userId, eventId, qrCodeUrl, validMemberIds } = req.body;

    try {
        const user = await User.findById(userId);
        const event = await Event.findById(eventId);

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: 'itmbuexploraclub@gmail.com',
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const userMailOptions = {
            from: 'itmbuexploraclub@gmail.com',
            to: user.email,
            subject: `Your Event Registration QR Code`,
            text: `Thank you for registering for the ${event.name}! Here is your QR code:`,
            html: `<p>Thank you for registering for the event!</p>
                   <p>Here is your QR code:</p>
                   <img src="cid:qrCodeImage" alt="Your QR Code" style="width: 200px; height: auto;" />`,
            attachments: [
                {
                    filename: 'qrcode.png',
                    path: qrCodeUrl,
                    cid: 'qrCodeImage'
                },
            ]
        };
        await transporter.sendMail(userMailOptions);

        const memberMailPromises = validMemberIds.map(async (memberId) => {
            const member = await User.findById(memberId);
            if (member) {
                const memberMailOptions = {
                    from: 'itmbuexploraclub@gmail.com',
                    to: member.email,
                    subject: `Event Registration Confirmation`,
                    text: `Thank you for registering for the ${event.name}!`,
                    html: `<p>You have been registered as a Team member for the ${event.name} with ${user.name}.</p>
                           <p>Looking forward to seeing you at the event!</p>`
                };
                return transporter.sendMail(memberMailOptions);
            }
        });

        await Promise.all(memberMailPromises);

        return NextResponse.json({ success: true, message: "QR code sent to user, and registration emails sent to members." }, { status: 201 });
    } catch (error) {
        console.error('Error sending emails:', error);
        return NextResponse.json({ success: false, message: "An error occurred", error: error.message }, { status: 500 });
    }
}
