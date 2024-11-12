import { Client } from '@upstash/qstash';

const qstashClient = new Client({
  token: process.env.QSTASH_TOKEN,
});

export const sendToQStash = async (message) => {
  try {
    console.log("Sending message to QStash:", message);

    const response = await qstashClient.publishJSON(
        message
    );

    console.log("Response from QStash:", response);

    return response;
  } catch (error) {
    console.error('Error sending message to QStash:', error.message);
    throw error;
  }
};
