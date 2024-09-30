import { NextResponse } from 'next/server';
import { WebClient } from '@slack/web-api';
import fs from 'fs';
import path from 'path';
import User from '../../../../models/user.models'; // Adjust according to your user model path
import Event from '../../../../models/event.model'; // Adjust according to your event model path
import Register from '../../../../models/register.models';

const slackToken = process.env.SLACK_BOT_TOKEN;
const web = new WebClient(slackToken);

const generateAttendanceFile = async (attendanceDetails) => {
  const filePath = path.join(__dirname, 'attendance.csv');

  // Prepare CSV content
  const fileContent = attendanceDetails.map(user =>
    `${user.name}, ${user.enrollmentNo}, ${user.email}, ${user.attendance}`
  ).join('\n');

  // Add CSV headers
  const csvWithHeaders = `Name, Enrollment No, Email, Attendance\n${fileContent}`;

  await fs.promises.writeFile(filePath, csvWithHeaders);

  return filePath;
};

export async function POST(req) {
  const { eventId } = await req.json();

  try {
    // Find the event by its ID and populate registered and attendance fields
    const event = await Event.findById(eventId)
    if (!event) {
      return NextResponse.json({ success: false, message: 'Event not found' }, { status: 404 });
    }

    // Get attendance and registration details
    const attendanceData = await Promise.all(
      event.registered.map(async (userId) => {
        const user = await User.findById(userId);
        const isPresent = event.attendance.includes(userId);
        return {
          name: user.name,
          enrollmentNo: user.enrollmentNo,
          email: user.email,
          attendance: isPresent ? 'Yes' : 'No',
        };
      })
    );

    // Generate the attendance file
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
