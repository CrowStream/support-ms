const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SUPPORT_MS_EMAIL_HOST,
    port: process.env.SUPPORT_MS_EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.SUPPORT_MS_EMAIL_USER,
        pass: process.env.SUPPORT_MS_EMAIL_PASS
    }
});

const send_email = async (to, subject, html) => {
    await transporter.sendMail({
        from: process.env.CROWSTREAM_EMAIL_FROM,
        to: to,
        subject: subject,
        html: html
    });
}

module.exports = { send_email }

