import connectDB from '../../../utils/connectDB';
import User from '../../../models/user.models';

connectDB();

const deleteUnverifiedAccounts = async () => {
  try {
    await User.deleteMany({
      isVerified: false,
      verificationExpires: { $lt: Date.now() },
    });
    console.log('Deleted expired unverified accounts');
  } catch (error) {

    console.error('Error deleting expired unverified accounts:', error);
  }
};



export async function GET() {
    try {
        await deleteUnverifiedAccounts();
        return new Response("Cron job executed successfully", { status: 200 })
      } catch (error) {
        return new Response("Failed to execute cron job", { status: 500 })
      }
  }
