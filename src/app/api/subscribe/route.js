import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Email from '@/models/Email';

//!get all emails
export async function GET() {
  try {
    await connectToDatabase();

    const emails = await Email.find({});

    return NextResponse.json({ emails });
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ message: 'Invalid email' }, { status: 400 });
    }

    await connectToDatabase();

    const existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      return NextResponse.json(
        { message: 'Email already subscribed' },
        { status: 409 }
      );
    }

    await Email.create({ email });

    return NextResponse.json(
      { message: 'Subscribed successfully!' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
