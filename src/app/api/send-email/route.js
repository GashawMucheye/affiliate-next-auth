import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { email, subject, message } = await req.json();

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your password or app password
      },
      tls: {
        rejectUnauthorized: false, // This ignores self-signed certificate errors
      },
    });

    await transporter.sendMail({
      from: `"Amazon Deals" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: `<p style="font-size: 16px; border: 1px solid #ccc; padding: 10px; border-radius: 5px; background-color: #f9f9f9;">${message}</p>`,
    });

    return Response.json({
      success: true,
      message: 'Email sent successfully!',
    });
  } catch (error) {
    return Response.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}
