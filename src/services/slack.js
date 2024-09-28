// import axios from 'axios';

// const slack = async ( message) => {
//     const channel = '#explora-club'
//   try {
//     const response = await axios.post('/api/slack', {
//       channel, // e.g., '#general'
//       text: message, // The message to be sent
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     console.log(response.data); // Log the result
//   } catch (error) {
//     console.error('Error sending message to Slack:', error.response?.data || error.message);
//   }
// };

// export default slack;

import axios from 'axios';

 const slack = async (message) => {
  try {
    const response = await axios.post(`${process.env.DOMAIN}/api/slack`, {
      channel: '#explora-club', // Your fixed Slack channel
      text: message, // Custom message (like user login details)
    });

    console.log('Slack notification sent:', response.data);
  } catch (error) {
    console.error('Failed to send Slack notification:', error.message);
  }
};
export default slack;
