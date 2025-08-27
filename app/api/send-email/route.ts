import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { fullName, companyName, workEmail, demoMessage } = await request.json();

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"${fullName}" <${process.env.EMAIL_USER}>`,
      replyTo: workEmail,
      to: 'lusebiswas@gmail.com',
      subject: `Inquiry from ${fullName} at ${companyName}`,
      html: `
        <p>Hi,</p>
        <p>${demoMessage}</p>
        <br>
        <p>Best regards,<br>
        ${fullName}<br>
        ${companyName}<br>
        ${workEmail}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
} 