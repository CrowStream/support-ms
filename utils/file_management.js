const { Storage } = require('@google-cloud/storage');

const storage = new Storage();


const upload_file = async(bucketName, filePath, destFileName) => {
    storage.bucket(bucketName).upload(filePath, {
        destination: destFileName,
    }).then((apiResponse) => {
        console.log("File sucessfully uploaded.");
    }).catch((err) => {
        console.error("Error uploading file.");
        console.error(err);
    });
}


const delete_file = async(bucketName, fileName) => {
    storage.bucket(bucketName).file(fileName).delete()
        .then((apiResponse) => {
            console.log("File successfully deleted.")
        })
        .catch((err) => {
            console.error("Error deleting file.");
            console.error(err);
        });
}

module.exports = {upload_file, delete_file}
