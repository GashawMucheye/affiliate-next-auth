import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import User from '@/models/User';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req) {
  try {
    await connectToDatabase();
    const { token, password } = await req.json();

    // Find user by reset token
    const user = await User.findOne({ resetToken: token });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined; // Remove token after reset
    await user.save();

    return NextResponse.json({ message: 'Password updated successfully!' });
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
