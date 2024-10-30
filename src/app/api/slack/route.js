import { NextResponse } from 'next/server';
import { WebClient } from '@slack/web-api';

// Instantiate Slack WebClient
const slackToken = process.env.SLACK_BOT_TOKEN;
const web = new WebClient(slackToken);

// Named export for POST method
export async function POST(request) {
  try {
    const { channel, text } = await request.json();

    // Send message to Slack
    const result = await web.chat.postMessage({
      channel, 
      text,
    });

    return NextResponse.json({ message: 'Message sent', result });
  } catch (error) {
    console.error('Error sending message to Slack:', error);
    return NextResponse.json({ error: 'Failed to send message to Slack' }, { status: 500 });
  }
}
