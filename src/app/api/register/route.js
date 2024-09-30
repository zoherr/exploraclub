import { NextResponse } from 'next/server';
import connectDB from "../../../utils/connectDB"
import User from '../../../models/user.models'; // Adjust according to your user model path
import Event from '../../../models/event.model'; // Adjust according to your event model path
import Register from '../../../models/register.models';
import QRCode from 'qrcode';
import nodemailer from 'nodemailer';
import slack from "../../../services/slack"

connectDB()
export const POST = async (req) => {
    const { email, eventId } = await req.json();
    try {

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        const event = await Event.findById(eventId);
        if (!event) {
            return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });
        }
        if (event.registered.includes(user._id)) {
            return NextResponse.json({ success: false, message: "User already registered for this event" }, { status: 400 });
        }
        const register = new Register({
            user: user._id,
            event: event._id,
        });

        const qrData = `${register._id}`;
        const qrCodeUrl = await QRCode.toDataURL(qrData);

        user.events.push(eventId)
        await user.save()

        event.registered.push(user._id)
        await event.save()

        register.qr = qrCodeUrl;
        await register.save();


        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Replace with your SMTP server
            port: 465, // SMTP port
            auth: {
                user: 'workforzoher@gmail.com', // Your email
                pass: 'aajxdyhxzovcqjyn', // Your email password
            },
        });

        const mailOptions = {
            from: 'spoofybhai@gmail.com', // Sender address
            to: user.email, // User's email
            subject: 'Your Event Registration QR Code',
            text: `Thank you for registering for the ${event.name}! Here is your QR code:`,
            html: `<p>Thank you for registering for the event!</p>
                   <p>Here is your QR code:</p>
                   <img src="cid:qrCodeImage" alt="Your QR Code" style="width: 200px; height: auto;" />`,
            attachments: [
                {
                    filename: 'qrcode.png',
                    path: qrCodeUrl,
                    cid: 'qrCodeImage' // Same cid as in the html img src
                }
            ]
        };

        await transporter.sendMail(mailOptions);
        await slack(`#event-registration`,`${user.name} register For ${event.name}`)
        // Successful response
        return NextResponse.json({ success: true, message: "Registration successful and QR code sent", qr: qrCodeUrl, qrImage: qrData }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "An error occurred", error: error.message }, { status: 500 });
    }
};
