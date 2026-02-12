import axios from 'axios';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create and configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSKEY, 
  },
  logger: true,
  debug: true,
});

// Helper function to send a message via Telegram
async function sendTelegramMessage(token, chat_id, message) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  try {
    const res = await axios.post(url, {
      text: message,
      chat_id,
    });
    return { ok: res.data.ok };
  } catch (error) {
    const err = error.response?.data || error.message;
    console.error('Error sending Telegram message:', err);
    return { ok: false, error: err };
  }
};

// HTML email template
const generateEmailTemplate = (name, email, userMessage) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #007BFF;">New Message Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #007BFF; padding-left: 10px; margin-left: 0;">
        ${userMessage}
      </blockquote>
      <p style="font-size: 12px; color: #888;">Click reply to respond to the sender.</p>
    </div>
  </div>
`;

// Helper function to send an email via Nodemailer
async function sendEmail(payload, message) {
  const { name, email, message: userMessage } = payload;
  
  const mailOptions = {
    from: `Portfolio <${process.env.EMAIL_ADDRESS}>`, 
    to: process.env.EMAIL_ADDRESS, 
    subject: `New Message From ${name}`, 
    text: message, 
    html: generateEmailTemplate(name, email, userMessage), 
    replyTo: email, 
  };
  
  try {
    // Verify transporter connectivity before attempting to send
    try {
      await transporter.verify();
    } catch (verifyErr) {
      console.error('SMTP verify failed:', verifyErr && (verifyErr.message || verifyErr));
      return { ok: false, error: `SMTP verify failed: ${verifyErr && (verifyErr.message || verifyErr)}` };
    }
    await transporter.sendMail(mailOptions);
    return { ok: true };
  } catch (error) {
    console.error('Error while sending email:', error.response?.data || error.message || error);
    return { ok: false, error: error.response?.data || error.message || String(error) };
  }
};

export async function POST(request) {
  try {
    const payload = await request.json();
    const { name, email, message: userMessage } = payload;
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chat_id = process.env.TELEGRAM_CHAT_ID;

    const message = `New message from ${name}\n\nEmail: ${email}\n\nMessage:\n\n${userMessage}\n\n`;

    // Send Telegram message only if token and chat_id are available
    let telegramResult = { ok: true };
    if (token && chat_id) {
      telegramResult = await sendTelegramMessage(token, chat_id, message);
    } else {
      console.warn('Telegram token or chat id missing — skipping Telegram send.');
      telegramResult = { ok: false, error: 'Telegram token or chat id missing' };
    }

    // Send email (required for delivery)
    const emailResult = await sendEmail(payload, message);

    // Build detailed response for easier debugging
    if (emailResult?.ok) {
      return NextResponse.json({
        success: true,
        message: 'Message sent (email delivered).',
        telegram: telegramResult,
      }, { status: 200 });
    }

    return NextResponse.json({
      success: false,
      message: 'Failed to send email.',
      emailError: emailResult?.error,
      telegram: telegramResult,
    }, { status: 500 });
  } catch (error) {
    console.error('API Error:', error.message);
    return NextResponse.json({
      success: false,
      message: 'Server error occurred.',
    }, { status: 500 });
  }
};