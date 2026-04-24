import nodemailer from "nodemailer";

type SendClientCredentialsEmailParams = {
  to: string;
  fullName?: string | null;
  clientId: string;
  password: string;
};

export const SUPPORT_EMAIL = "support@ajmeraexchange.in";
export const FROM_ADDRESS = `"Ajmera Exchange" <${SUPPORT_EMAIL}>`;

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) {
    return transporter;
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error("SMTP credentials are not configured");
  }

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });

  return transporter;
}

type SendOtpEmailParams = {
  to: string;
  otp: string;
};

export async function sendOtpEmail({ to, otp }: SendOtpEmailParams) {
  if (!process.env.SMTP_USER) {
    throw new Error("SMTP sender is not configured");
  }

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#f8fafc;color:#0f172a">
      <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:28px;text-align:center">
        <h2 style="margin:0 0 8px;font-size:20px;color:#00B386">Ajmera Exchange</h2>
        <p style="margin:0 0 4px;font-size:13px;color:#475569">Your verification code</p>
        <div style="margin:18px 0;padding:18px 12px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px">
          <p style="margin:0;font-size:32px;font-weight:700;color:#0f172a;letter-spacing:8px">${otp}</p>
        </div>
        <p style="margin:0 0 4px;font-size:12px;color:#475569">
          This code expires in 5 minutes. Do not share it with anyone.
        </p>
        <p style="margin:16px 0 0;font-size:11px;color:#94a3b8">
          If you didn&apos;t request this, please ignore this email or reply to
          <a href="mailto:${SUPPORT_EMAIL}" style="color:#00B386;text-decoration:none">${SUPPORT_EMAIL}</a>.
        </p>
      </div>
    </div>
  `;

  const text = [
    "Ajmera Exchange verification code",
    "",
    `Your code: ${otp}`,
    "",
    "This code expires in 5 minutes.",
    `If you didn't request this, reply to ${SUPPORT_EMAIL}.`,
  ].join("\n");

  await getTransporter().sendMail({
    from: FROM_ADDRESS,
    sender: SUPPORT_EMAIL,
    replyTo: SUPPORT_EMAIL,
    to,
    subject: `Ajmera Exchange verification code: ${otp}`,
    html,
    text,
  });
}

export async function sendClientCredentialsEmail({
  to,
  fullName,
  clientId,
  password,
}: SendClientCredentialsEmailParams) {
  if (!process.env.SMTP_USER) {
    throw new Error("SMTP sender is not configured");
  }

  const name = fullName?.trim() || "Client";
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#f8fafc;color:#0f172a">
      <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:24px">
        <h2 style="margin:0 0 12px;font-size:24px;color:#00B386">Ajmera Exchange Login Credentials</h2>
        <p style="margin:0 0 16px;font-size:14px;line-height:1.6">Hello ${name},</p>
        <p style="margin:0 0 16px;font-size:14px;line-height:1.6">
          Your trading account has been activated by the Ajmera Exchange team. Use the credentials below to sign in to the web or mobile app.
        </p>
        <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:12px;padding:16px;margin:16px 0">
          <p style="margin:0 0 8px;font-size:14px"><strong>Client ID:</strong> ${clientId}</p>
          <p style="margin:0;font-size:14px"><strong>Password:</strong> ${password}</p>
        </div>
        <p style="margin:0 0 8px;font-size:14px;line-height:1.6">
          Please keep these credentials secure. After signing in, you can review your profile, orders, positions, funds, and ledger inside the app.
        </p>
        <p style="margin:16px 0 0;font-size:12px;color:#475569">
          If you did not request this account, reply to this email at
          <a href="mailto:${SUPPORT_EMAIL}" style="color:#00B386;text-decoration:none">${SUPPORT_EMAIL}</a>.
        </p>
        <p style="margin:24px 0 0;font-size:11px;color:#94a3b8;text-align:center">
          — Team Ajmera Exchange
        </p>
      </div>
    </div>
  `;

  const text = [
    `Hello ${name},`,
    "",
    "Your Ajmera Exchange trading account has been activated.",
    `Client ID: ${clientId}`,
    `Password: ${password}`,
    "",
    "Please keep these credentials secure.",
    `Questions? Reply to ${SUPPORT_EMAIL}.`,
    "",
    "— Team Ajmera Exchange",
  ].join("\n");

  await getTransporter().sendMail({
    from: FROM_ADDRESS,
    sender: SUPPORT_EMAIL,
    replyTo: SUPPORT_EMAIL,
    to,
    subject: "Your Ajmera Exchange login credentials",
    html,
    text,
  });
}
