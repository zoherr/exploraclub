// utils/qstash.js
import axios from 'axios';

export const sendToQStash = async (message) => {
  try {
    const response = await axios.post(process.env.QSTASH_URL, message, {
      headers: {
        'Authorization': `Bearer ${process.env.QSTASH_TOKEN}`,
        'Content-Type': 'application/json',
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error sending message to QStash:', error);
    throw new Error('Failed to send message to QStash');
  }
};
