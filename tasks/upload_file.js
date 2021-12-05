const { upload_file } = require('../utils/file_management');

const upload_file_task = async (msg) => {
    msg = JSON.parse(msg.content.toString());
    upload_file(msg.bucketName, msg.base64File, msg.destFileName)
    .then(() => {
        console.log('The file has been upload');
    }).catch((err) => {
        console.error(err);
        console.log('The file has not been upload.');
    })
}

module.exports = { upload_file_task }