const stream = require('stream');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage();


const upload_file = async(bucketName, base64File, destFileName) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(Buffer.from(base64File, 'base64'));
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(destFileName);
    bufferStream.pipe(file.createWriteStream())
        .on('error', (err) => {
            console.error("Error uploading file.");
            console.error(err);
        }).on('finish', () =>{
            console.log("File sucessfully uploaded.");
        });
}


module.exports = { upload_file }
