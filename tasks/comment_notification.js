const { send_email } = require("../utils/email_sender");

const comment_notification = async (msg) => {
    msg = JSON.parse(msg.content.toString());
    send_email(msg.to, msg.subject, msg.html)
    .then(() => {
        console.log("The comment notification has been sent");
    }).catch((err) => {
        console.error(err);
        console.log("The comment notification has not been sent.");
    })
}

module.exports = {
    comment_notification
}