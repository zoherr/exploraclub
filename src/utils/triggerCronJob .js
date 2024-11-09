import axios from 'axios';

const triggerCronJob = async () => {
  try {
  await axios.get("https://exploraclub.vercel.app/api/cron");

  } catch (error) {
  }
};
export default triggerCronJob;
