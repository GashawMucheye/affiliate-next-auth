import { NextResponse } from 'next/server';
import User from '@/models/User';
import crypto from 'crypto';
import { sendEmail } from '@/utils/sendEmail';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req) {
  try {
    await connectToDatabase();
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    await user.save();
    let nodeEnv = process.env.NODE_ENV;

    // Send reset email
    const resetUrl = `${
      nodeEnv === 'development'
        ? process.env.NEXT_PUBLIC_BASE_URL
        : process.env.NEXT_PUBLIC_BASE_URL_PRODUCTION
    }/reset-password?token=${resetToken}`;
    await sendEmail(
      user.email,
      'Reset Your Password',
      `Click the link to reset: ${resetUrl}`
    );

    return NextResponse.json({ message: 'Reset email sent!' });
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
