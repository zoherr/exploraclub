import { NextResponse } from 'next/server';
import { WebClient } from '@slack/web-api';
import fs from 'fs';
import path from 'path';
import Register from '../../../../models/register.models';
import User from "../../../../models/user.models.js"
import Event from '../../../../models/event.model';
import connectDB from "../../../../utils/connectDB";
const slackToken = process.env.SLACK_BOT_TOKEN;
const web = new WebClient(slackToken);
connectDB()
const generateAttendanceFile = async (attendanceDetails) => {
    const filePath = path.join(__dirname, 'attendance.csv');

    // Use Promise.all to wait for all asynchronous operations to complete
    const fileContent = await Promise.all(attendanceDetails.map(async (registration) => {
      // Check if the user has team members
      let teamData = '';
      const user = await User.findById(registration.user);

      // Prepare to format the team members
      if (registration.members.length > 0) {
        // Fetch member details using User.findById for each member ID
        const membersDetails = await Promise.all(
          registration.members.map(async (memberId) => {
            const member = await User.findById(memberId);
            return member ? `${member.name}, ${member.email}` : 'N/A, N/A'; // Fallback if member not found
          })
        );

        // Join members' details with the appropriate formatting
        teamData = membersDetails.map(memberDetail => `,,, , ${memberDetail}`).join('\n');
      }

      // Return primary user details followed by team members
      return `${user.name}, ${user.enrollmentNo}, ${registration.semester}, ${user.email}, , , ${registration.attendance}\n${teamData}`;
    }));

    // Join all the file contents
    const joinedFileContent = fileContent.join('\n\n');

    // Add headers to the CSV
    const csvWithHeaders = `Name, Enrollment No, Semester, Email, Team Member Names, Team Members Email, Attendance\n${joinedFileContent}`;

    // Write CSV to file
    await fs.promises.writeFile(filePath, csvWithHeaders);

    return filePath;
  };



// POST handler for generating the attendance sheet
export async function POST(req) {
  const { eventId } = await req.json();

  try {
    // Fetch the event by eventId and populate registerId
    const event = await Event.findById(eventId)
    if (!event) {
      return NextResponse.json({ success: false, message: 'Event not found' }, { status: 404 });
    }

    // Get all registrations for the event and populate user and members
    const registrations = await Register.find({ _id: { $in: event.registerId } })


    // Prepare attendance data
    const attendanceData = registrations.map(registration => {
      // Get the primary user details and their attendance
      const isPresent = registration.attendance ? 'Yes' : 'No';

      // Return the details in the format needed
      return {
        user: registration.user,
        semester: registration.semester,
        members: registration.members,  // Get populated member details directly
        attendance: isPresent,
      };
    });

    // Generate the attendance CSV file
    const filePath = await generateAttendanceFile(attendanceData);

    // Upload the file to Slack
    const result = await web.files.uploadV2({
      channel_id: 'C07PGCB25R9',
      file: fs.createReadStream(filePath),
      title: 'Attendance File',
      filename: 'attendance.csv',
    });

    console.log('File uploaded to Slack:', result);

    return NextResponse.json({ success: true, message: 'File sent to Slack', attendanceDetails: attendanceData });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to send file to Slack', error: error.message }, { status: 500 });
  }
}
