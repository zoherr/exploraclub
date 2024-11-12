import { NextResponse } from 'next/server';
import connectDB from "../../../utils/connectDB";
import User from '../../../models/user.models';
import Event from '../../../models/event.model';
import Register from '../../../models/register.models';
import QRCode from 'qrcode';
import nodemailer from 'nodemailer';
import slack from "../../../services/slack";
import { sendToQStash } from '../../../utils/qstash';

connectDB();

export const POST = async (req) => {
    await connectDB();
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

const qstashMessage = {
    url: 'https://exploraclub.vercel.app/api/qstash/send-registration-emails',
    body: JSON.stringify({
        userId,
        eventId,
        qrCodeUrl,
        validMemberIds
    }),
};

await sendToQStash(qstashMessage);
// -----------------------------------------------------------------------
        return NextResponse.json({ success: true, message: "Registration successful. QR code sent to user, and registration emails sent to members." }, { status: 201 });

    } catch (error) {
        slack(`#error`, `Error Event Register: ${error.message}`);
        console.error(error);
        return NextResponse.json({ success: false, message: "An error occurred", error: error.message }, { status: 500 });
    }
};
