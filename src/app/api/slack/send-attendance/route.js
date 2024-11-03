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

// Connect to the database
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
            { id: 'teamMembersEnrollmentNo', title: 'Team Members Enrollment No' },
            { id: 'attendance', title: 'Attendance' },
        ]
    });

    const csvRecords = [];

    // Use Promise.all to wait for all asynchronous operations to complete
    await Promise.all(attendanceDetails.map(async (registration) => {
        const user = await User.findById(registration.user);

        // Add primary user record
        csvRecords.push({
            name: user.name,
            enrollmentNo: user.enrollmentNo,
            semester: registration.semester,
            email: user.email,
            attendance: registration.attendance ? 'Yes' : 'No',
            teamMemberNames: '',
            teamMembersEmail: '',
            teamMembersEnrollmentNo: '',
        });

        if (registration.members.length > 0) {
            // Fetch member details using User.findById for each member ID
            const membersDetails = await Promise.all(
                registration.members.map(async (memberId) => {
                    const member = await User.findById(memberId);
                    return member ? { name: member.name, email: member.email ,enrollmentNo: member.enrollmentNo } : { name: '', email: '',enrollmentNo:'' };
                })
            );

            // Add team member records
            membersDetails.forEach(member => {
                csvRecords.push({
                    name: '',
                    enrollmentNo: '', // No enrollment number for team members
                    semester: '', // No semester for team members
                    email: '',
                    attendance: '', // No attendance info for team members
                    teamMemberNames: member.name, // Include team member name
                    teamMembersEmail: member.email, // Include team member email
                    teamMembersEnrollmentNo: member.enrollmentNo
                });
            });
        }
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
        const event_name = `${event.name} Student Details`;
        const filename = `${event.name}_StudentDetails.csv`;
        // Upload the file to Slack
        const result = await web.files.uploadV2({
            channel_id: 'C07PGCB25R9',
            file: csvBuffer,
            title: event_name,
            filename: filename,
            filetype: 'csv',
        });

        console.log('File uploaded to Slack:', result);

        return NextResponse.json({ success: true, message: 'File sent to Slack', attendanceDetails: attendanceData });
    } catch (error) {
        await slack(`#error`, `Error Sending Attendance: ${error.message}`);
        console.error('Error:', error);
        return NextResponse.json({ success: false, message: 'Failed to send file to Slack', error: error.message }, { status: 500 });
    }
}
