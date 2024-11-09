import connectDB from '../../../utils/connectDB';
import User from '../../../models/user.models';
import { isBefore } from 'date-fns'; // Importing date-fns for comparison
import { NextRequest, NextResponse } from "next/server";



const deleteUnverifiedAccounts = async () => {
  try {
    const currentUtcTime = new Date();
    console.log(currentUtcTime);

    await User.deleteMany({
      isVerified: false,
      verificationExpires: { $lt:currentUtcTime  },
    });
    console.log('Deleted expired unverified accounts');
  } catch (error) {

    console.error('Error deleting expired unverified accounts:', error);
  }
};



export async function GET() {
    try {
        await connectDB();
        await deleteUnverifiedAccounts();
        return NextResponse.json({ message: "Cron job executed successfully" }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ message: "Failed to execute cron job", error: error.message }, { status: 500 });
      }
  }
