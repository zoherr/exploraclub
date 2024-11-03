import { NextResponse } from 'next/server';
import { WebClient } from '@slack/web-api';
import User from "../../../../models/user.models.js";
import Register from '../../../../models/register.models';
import Event from '../../../../models/event.model';
import connectDB from "../../../../utils/connectDB";
import { createObjectCsvStringifier } from 'csv-writer';
import slack from "../../../../services/slack.js";

const slackToken = process.env.SLACK_BOT_TOKEN;
const web = new WebClient(slackToken);

connectDB();

// Function to generate user details for certificate CSV
const generateCertificateUsersCSV = async (event) => {
    const users = await User.find({ _id: { $in: event.registered } });

    // Create a CSV stringifier
    const csvStringifier = createObjectCsvStringifier({
        header: [
            { id: 'name', title: 'Name' },
            { id: 'enrollmentNo', title: 'Enrollment No' },
            { id: 'email', title: 'Email' },
            { id: 'semester', title: 'Semester' },
            { id: 'certificate', title: 'Certificate' },
        ],
    });

    // Map user data to include certificate status
    const csvRecords = users.map(user => ({
        name: user.name,
        enrollmentNo: user.enrollmentNo,
        email: user.email,
        semester: user.semester,
        certificate: event.certificate.includes(user._id.toString()) ? 'Yes' : 'No',
    }));

    // Generate CSV string with headers and records
    const csvContent = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(csvRecords);
    return Buffer.from(csvContent, 'utf-8');
};

// POST handler for generating the certificate users CSV
export async function POST(req) {
    const { eventId } = await req.json();

    try {
        // Fetch the event by eventId
        const event = await Event.findById(eventId);
        if (!event) {
            return NextResponse.json({ success: false, message: 'Event not found' }, { status: 404 });
        }
        const event_name = `${event.name} Certificate List`
        const filename = `${event.name}_certificate.csv`;
        // Generate CSV data
        const csvBuffer = await generateCertificateUsersCSV(event);

        // You can upload to Slack or return the CSV buffer as needed
        const result = await web.files.uploadV2({
            channel_id: 'C07PGCB25R9', // Replace with your Slack channel ID
            file: csvBuffer,
            title: event_name,
            filename: filename,
            filetype: 'csv',
        });

        console.log('File uploaded to Slack:', result);

        return NextResponse.json({ success: true, message: 'CSV generated and sent to Slack', attendanceDetails: csvBuffer.toString() });
    } catch (error) {
        console.error('Error:', error);
        await slack(`#error`, `Error Sending Certificate Users: ${error.message}`);
        return NextResponse.json({ success: false, message: 'Failed to generate CSV', error: error.message }, { status: 500 });
    }
}
