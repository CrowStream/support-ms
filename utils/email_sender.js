const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.CROWSTREAM_EMAIL_HOST,
    port: process.env.CROWSTREAM_EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.CROWSTREAM_EMAIL_USER,
        pass: process.env.CROWSTREAM_EMAIL_PASS
    }
});

const send_email = (to, subject, html) => {
    return transporter.sendMail({
        from: process.env.CROWSTREAM_EMAIL_FROM,
        to: to,
        subject: subject,
        html: html
    });
}

module.exports = { send_email }

