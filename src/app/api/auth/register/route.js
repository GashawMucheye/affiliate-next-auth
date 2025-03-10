import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const { name, email, password } = await req.json();

  await connectToDatabase();

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return new Response(JSON.stringify({ error: 'User already exists' }), {
      status: 400,
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  return new Response(
    JSON.stringify({ message: 'User registered successfully!' }),
    { status: 201 }
  );
}
