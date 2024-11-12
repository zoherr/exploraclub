// utils/qstash.js
import fetch from 'node-fetch';

export const sendToQStash = async (message) => {
  try {
    const response = await fetch(process.env.QSTASH_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.QSTASH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error('Failed to send message to QStash');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error sending message to QStash:', error);
    throw error;
  }
};
