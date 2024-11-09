import axios from 'axios';

const triggerCronJob = async () => {
  try {
  await axios.get("/api/cron");

  } catch (error) {
  }
};
export default triggerCronJob;
