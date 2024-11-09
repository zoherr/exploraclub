import axios from 'axios';

const triggerCronJob = async () => {
  try {
 const res =  await axios.get("/api/cron");
  } catch (error) {
  }
};
export default triggerCronJob;
