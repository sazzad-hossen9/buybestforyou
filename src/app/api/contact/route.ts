import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // In a production app, this would send an email or write to a database.
    console.log('[Contact API Received Submission]', {
      name,
      email,
      subject,
      message,
      receivedAt: new Date().toISOString()
    });

    return NextResponse.json(
      { success: true, message: 'Thank you! Your message has been sent successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Contact API Error]', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
