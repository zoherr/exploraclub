import { NextResponse } from 'next/server';
import connectDB from "../../../utils/connectDB";
import User from '../../../models/user.models';
import Event from '../../../models/event.model';
import Register from '../../../models/register.models';
import QRCode from 'qrcode';
import nodemailer from 'nodemailer';
import slack from "../../../services/slack";

;

export const POST = async (req) => {
    await connectDB()
    const { userId, eventId, members } = await req.json();
    try {
        const user = await User.findById(userId);
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

        const memberIds = await Promise.all(
            members.map(async (enrollmentNo) => {
                const member = await User.findOne({ enrollmentNo });
                return member ? member._id : null;
            })
        );

        const validMemberIds = memberIds.filter(id => id !== null);

        const register = new Register({
            user: user._id,
            event: event._id,
            semester: user.semester,
            members: validMemberIds,
        });

        const qrData = `${register._id}`;
        const qrCodeUrl = await QRCode.toDataURL(qrData);

        user.events.push(eventId);
        event.registerId.push(register._id);
        event.registered.push(user._id);

        const memberUpdatePromises = validMemberIds.map(async (memberId) => {
            const member = await User.findById(memberId);
            if (member) {
                if (event.registered.includes(memberId)) {
                    return NextResponse.json({ success: false, message: "Member already registered for this event" }, { status: 400 });
                }
                event.registered.push(memberId);
                member.events.push(eventId);
                await member.save();
            }
        });

        await Promise.all(memberUpdatePromises);
        await Promise.all([user.save(), event.save()]);

        register.qr = qrCodeUrl;
        await register.save();
// -----------------------------------------------------------------------

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
            subject: `🎫 Your Registration for ${event.name} – Here's Your QR Code!`,
            text: `Hello ${user.name},\n\nThank you for registering for ${event.name}! Your QR code for event access is attached below.\n\nBest regards,\nThe ExplorA Club Team`,
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; background-color: #fff; padding: 20px; border-radius: 8px;">
                    <h2 style="color: #4CAF50; text-align: center;">Welcome to ${event.name}, ${user.name}!</h2>
                    <p style="font-size: 1.1em; text-align: center;">We’re thrilled to have you join us. Here’s your personal QR code to access the event.</p>

                    <div style="text-align: center; margin: 30px 0;">
                        <img src="cid:qrCodeImage" alt="Your QR Code" style="width: 200px; height: auto; border: 2px solid #4CAF50; padding: 15px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);" />
                    </div>

                    <p style="font-size: 0.9em; color: #666; text-align: center;">Please show this code at the entrance for a seamless entry.</p>

                    <p style="text-align: center; font-size: 1.1em; margin-top: 30px;">
                        Looking forward to seeing you there! 🎉<br>
                        <strong>The Explora Club Team</strong>
                    </p>

                    <footer style="font-size: 0.8em; color: #aaa; text-align: center; margin-top: 30px;">
                        <p>If you have any questions, reach us at <a href="mailto:itmbuexploraclub@gmail.com" style="color: #4CAF50;">itmbuexploraclub@gmail.com</a></p>
                    </footer>
                </div>
            `,
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
                    subject: `🎉 Confirmation: You're Registered for ${event.name}! 🎉`,
                    text: `Hello ${member.name},\n\nThank you for joining ${user.name}'s team for the ${event.name}! We look forward to seeing you there.\n\nBest regards,\nThe Explora Club Team`,
                    html: `
                        <div style="font-family: Arial, sans-serif; color: #333; background-color: #fff; padding: 20px; border-radius: 8px;">
                            <h2 style="color: #4CAF50; text-align: center;">You're Registered as a Team Member for ${event.name}!</h2>
                            <p style="font-size: 1.1em; text-align: center;">Hello ${member.name},</p>
                            <p style="text-align: center;">We are excited to have you join <strong>${user.name}</strong> for this event.</p>
                            <p style="text-align: center; font-size: 1.1em; margin-top: 20px;">Looking forward to seeing you there!</p>
                            <p style="text-align: center; color: #666;">Best wishes,<br><strong>The ExplorA Club Team</strong></p>
                            <footer style="font-size: 0.8em; color: #aaa; text-align: center; margin-top: 30px;">
                                <p>Need assistance? Contact us at <a href="mailto:itmbuexploraclub@gmail.com" style="color: #4CAF50;">itmbuexploraclub@gmail.com</a></p>
                            </footer>
                        </div>
                    `
                };
                return transporter.sendMail(memberMailOptions);
            }
        });


        await Promise.all(memberMailPromises);
// -----------------------------------------------------------------------
        return NextResponse.json({ success: true, message: "Registration successful. QR code sent to user, and registration emails sent to members." }, { status: 201 });

    } catch (error) {
        slack(`#error`, `Error Event Register: ${error.message}`);
        console.error(error);
        return NextResponse.json({ success: false, message: "An error occurred", error: error.message }, { status: 500 });
    }
};
