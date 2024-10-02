import { NextResponse } from 'next/server';
import { WebClient } from '@slack/web-api';
import User from "../../../../models/user.models.js";
import Register from '../../../../models/register.models';
import Event from '../../../../models/event.model';
import connectDB from "../../../../utils/connectDB";
import { createObjectCsvStringifier } from 'csv-writer';

const slackToken = process.env.SLACK_BOT_TOKEN;
const web = new WebClient(slackToken);
connectDB();

// Function to generate CSV in memory
const generateAttendanceCSV = async (attendanceDetails) => {
    // Create a CSV stringifier
    const csvStringifier = createObjectCsvStringifier({
        header: [
            { id: 'name', title: 'Name' },
            { id: 'enrollmentNo', title: 'Enrollment No' },
            { id: 'semester', title: 'Semester' },
            { id: 'email', title: 'Email' },
            { id: 'teamMemberNames', title: 'Team Member Names' },
            { id: 'teamMembersEmail', title: 'Team Members Email' },
            { id: 'attendance', title: 'Attendance' },
        ]
    });

    // Use Promise.all to wait for all asynchronous operations to complete
    const csvRecords = await Promise.all(attendanceDetails.map(async (registration) => {
        let teamData = '';
        const user = await User.findById(registration.user);

        if (registration.members.length > 0) {
            // Fetch member details using User.findById for each member ID
            const membersDetails = await Promise.all(
                registration.members.map(async (memberId) => {
                    const member = await User.findById(memberId);
                    return member ? { name: member.name, email: member.email } : { name: '', email: '' };
                })
            );

            teamData = membersDetails.map(member => ({
                teamMemberNames: member.name,
                teamMembersEmail: member.email,
            }));
        }

        // Return primary user details followed by team members
        return {
            name: user.name,
            enrollmentNo: user.enrollmentNo,
            semester: registration.semester,
            email: user.email,
            attendance: registration.attendance,
            teamMemberNames: teamData.map(td => td.teamMemberNames).join('\n'),
            teamMembersEmail: teamData.map(td => td.teamMembersEmail).join('\n'),
        };
    }));

    // Generate CSV string with headers and records
    const csvContent = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(csvRecords);
    return Buffer.from(csvContent, 'utf-8');
};

// POST handler for generating the attendance sheet
export async function POST(req) {
    const { eventId } = await req.json();

    try {
        // Fetch the event by eventId and populate registerId
        const event = await Event.findById(eventId);
        if (!event) {
            return NextResponse.json({ success: false, message: 'Event not found' }, { status: 404 });
        }

        // Get all registrations for the event
        const registrations = await Register.find({ _id: { $in: event.registerId } });

        // Prepare attendance data
        const attendanceData = registrations.map(registration => ({
            user: registration.user,
            semester: registration.semester,
            members: registration.members,
            attendance: registration.attendance ? 'Yes' : 'No',
        }));

        // Generate the attendance CSV in memory
        const csvBuffer = await generateAttendanceCSV(attendanceData);

        // Upload the file to Slack
        const result = await web.files.uploadV2({
            channel_id: 'C07PGCB25R9',
            file: csvBuffer,
            title: 'Attendance File',
            filename: 'attendance.csv',
            filetype: 'csv',
        });

        console.log('File uploaded to Slack:', result);

        return NextResponse.json({ success: true, message: 'File sent to Slack', attendanceDetails: attendanceData });
    } catch (error) {
        slack(`#error`, `Error Sending Attendance: ${error.message}`)
        console.error('Error:', error);
        return NextResponse.json({ success: false, message: 'Failed to send file to Slack', error: error.message }, { status: 500 });
    }
}
