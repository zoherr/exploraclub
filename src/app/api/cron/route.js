import connectDB from '../../../utils/connectDB';
import User from '../../../models/user.models';
import { isBefore } from 'date-fns'; // Importing date-fns for comparison



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
        const currentUtcTime = new Date();
        console.log(currentUtcTime);
        await connectDB();
        await deleteUnverifiedAccounts();
        return new Response("Cron job executed successfully",currentUtcTime, { status: 200 })
      } catch (error) {
        return new Response("Failed to execute cron job", { status: 500 })
      }
  }
