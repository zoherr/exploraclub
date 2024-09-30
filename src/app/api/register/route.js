import { NextResponse } from 'next/server';
import connectDB from "../../../utils/connectDB";
import User from '../../../models/user.models';
import Event from '../../../models/event.model';
import Register from '../../../models/register.models';
import QRCode from 'qrcode';
import nodemailer from 'nodemailer';
import slack from "../../../services/slack";

connectDB();
export const POST = async (req) => {
    const { email, eventId, members } = await req.json();
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

        // Fetch members based on their enrollment numbers and map them to their ObjectIds
        const memberIds = await Promise.all(
            members.map(async (enrollmentNo) => {
                const member = await User.findOne({ enrollmentNo });
                return member ? member._id : null; // Return null if member not found
            })
        );

        // Filter out null values (in case some members were not found)
        const validMemberIds = memberIds.filter(id => id !== null);

        // Create a new registration document
        const register = new Register({
            user: user._id,
            event: event._id,
            semester: user.semester,
            members: validMemberIds, // Use the valid ObjectIds
        });

        const qrData = `${register._id}`;
        const qrCodeUrl = await QRCode.toDataURL(qrData);

        // Update user events and event registered lists
        user.events.push(eventId);
        event.registerId.push(register._id);
        event.registered.push(user._id);
        const memberUpdatePromises = validMemberIds.map(async (memberId) => {
            const member = await User.findById(memberId);
            if (member ) {
                if(event.registered.includes(memberId)){
                    return NextResponse.json({ success: false, message: "User already registered for this event" }, { status: 400 });
                }
                event.registered.push(memberId);
                member.events.push(eventId);
                await member.save(); // Save updated member
            }
        });

        await Promise.all(memberUpdatePromises);
        // Save user and event after all updates
        await Promise.all([
            user.save(),
            event.save(),
        ]);

        // Save the register document
        register.qr = qrCodeUrl;
        await register.save();

        // Update events for each valid member


        // Send email notifications as before...
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Replace with your SMTP server
            port: 465, // SMTP port
            auth: {
                user: 'workforzoher@gmail.com', // Your email
                pass: 'aajxdyhxzovcqjyn', // Your email password
            },
        });

        // Create mail options for each team member
        const mailPromises = [...validMemberIds, user._id].map(memberId => {
            return User.findById(memberId).then(member => {
                if (member) {
                    const mailOptions = {
                        from: 'spoofybhai@gmail.com', // Sender address
                        to: member.email, // Member's email
                        subject: `Your Event Registration QR Code`,
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

                    return transporter.sendMail(mailOptions); // Send mail for each member
                }
            });
        });

        await Promise.all(mailPromises); // Wait for all emails to be sent
        await slack(`#event-registration`, `${user.name} registered for ${event.name}`);

        // Successful response
        return NextResponse.json({ success: true, message: "Registration successful and QR code sent", qr: qrCodeUrl, qrImage: qrData }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "An error occurred", error: error.message }, { status: 500 });
    }
};
