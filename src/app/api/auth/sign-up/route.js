import connectDB from "../../../../utils/connectDB"
import User from "../../../../models/user.models"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken';
import slack from "../../../../services/slack"
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { addMinutes, isAfter, parseISO } from 'date-fns';
import { redisWithFallback } from "../../../../utils/redis"
connectDB()
export const POST = async (req) => {
    try {
        const body = await req.json();
        const { name, email, password, enrollmentNo, semester } = body;

        if (!name || !email || !password || !enrollmentNo) {
            return new Response("Name, Username and Password is required", { status: 401 });
        }

        const user = await User.findOne({ enrollmentNo });
        if (user) {
            return new Response("enrollmentNo already exist", { status: 400 });
        }
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const salt = await bcryptjs.genSalt(12);
        const verificationLink = `https://exploraclub.vercel.app/api/auth/verification?token=${verificationToken}`;

        const hashedPassword = await bcryptjs.hash(password, salt);

        const emailTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #333333;
    }
    p {
      color: #666666;
      line-height: 1.6;
    }
      a{
      color: white;
      }
    .btn {
      display: inline-block;
      background-color: #4CAF50;
      color: white;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
    }
    .footer {
      text-align: center;
      color: #999999;
      margin-top: 20px;
    }
  </style>
</head>
<body>

  <div class="container">
    <h1>Welcome to Explora Club!</h1>
    <p>Hi ${name},</p>
    <p>We're excited to have you join us at Explora Club! Get ready to explore and enjoy.</p>
  <a href="${verificationLink}"  class="btn">Verify Now</a>
    <p>If you have any questions, feel free to reach out to our support team at itmbuexploraclub@gmail.com.</p>

    <p>Welcome aboard!</p>

    <div class="footer">
      <p>© 2024 ExploraClub. All rights reserved.</p>
    </div>
  </div>

</body>
</html>
`;

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // Replace with your SMTP server
            port: 465, // SMTP port
            auth: {
                user: 'itmbuexploraclub@gmail.com', // Your email
                pass: process.env.SMTP_PASSWORD,
            },
        });
        const mailOptions = {
            from: 'itmbuexploraclub@gmail.com',
            to: email,
            subject: 'Welcome to Explora Club!!',
            html: emailTemplate,
        };

        const userData = { name, email, hashedPassword,enrollmentNo: enrollmentNo.toUpperCase(), semester };

        await  redisWithFallback("set",verificationToken,JSON.stringify(userData), 'EX', 300)
        const response = NextResponse.json({ message: "User saved successfully" });

        await transporter.sendMail(mailOptions);
        return response;
    } catch (error) {
        slack(`#error`, `Error User Register: ${error.message}`);

        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
