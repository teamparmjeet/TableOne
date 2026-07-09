import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendAdminRequestEmail(data: {
  name: string;
  email: string;
  address: string;
  description: string;
}) {
  await transporter.sendMail({
    from: `"Website Request" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "🔔 New Request Received",

    html: `
      <div style="font-family:Arial,sans-serif;padding:20px">
        <h2>New Request Submitted</h2>

        <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;width:100%">
          <tr>
            <td><strong>Name</strong></td>
            <td>${data.name}</td>
          </tr>

          <tr>
            <td><strong>Email</strong></td>
            <td>${data.email}</td>
          </tr>

          <tr>
            <td><strong>Address</strong></td>
            <td>${data.address}</td>
          </tr>

          <tr>
            <td><strong>Description</strong></td>
            <td>${data.description}</td>
          </tr>
        </table>

        <br>

        <p>This request was submitted from your website.</p>
      </div>
    `,
  });
}