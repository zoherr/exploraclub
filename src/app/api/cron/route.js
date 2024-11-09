import cron from 'node-cron';
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

cron.schedule('* * * * *', async () => {
  await deleteUnverifiedAccounts();
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await deleteUnverifiedAccounts();
      res.status(200).json({ message: 'Cron job executed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to execute cron job' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
