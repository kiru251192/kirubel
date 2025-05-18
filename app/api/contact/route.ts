import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Check email configuration
    const requiredEnvVars = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASSWORD'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    if (missingVars.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Missing required email configuration: ${missingVars.join(', ')}` 
        },
        { status: 500 }
      );
    }

    // Create email content
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    // Send email using nodemailer
    const transporter = require('nodemailer').createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: true,  // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: 'New Portfolio Contact Form Submission',
      html: emailContent
    };

    try {
      await transporter.sendMail(mailOptions);
      return NextResponse.json({ 
        success: true, 
        message: 'Message sent successfully!' 
      });
    } catch (mailError) {
      console.error('Error sending email:', mailError);
      
      // Get more specific error message if available
      const errorMessage = mailError instanceof Error 
        ? mailError.message 
        : 'Failed to send email. Please check your email configuration.';

      // Check for specific Gmail authentication errors
      if (errorMessage.includes('535-5.7.8')) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Authentication failed. Please ensure you have generated an App Password in your Google Account settings.' 
          },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error 
          ? error.message 
          : 'An unexpected error occurred. Please try again later.' 
      },
      { status: 500 }
    );
  }
