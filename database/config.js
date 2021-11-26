const mongoose = require('mongoose');

const dbConnection = () => {
    console.log('Conecting to database ' + process.env.SUPPORT_DB_URL)
    mongoose.connect(process.env.SUPPORT_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.SUPPORT_DB_DATABASE
    }).then(() => {
        console.log('Database initializated.');
    }).catch((error) => {
        console.error(error);
        throw new Error('Error initializing the database.');
    });
}

module.exports = { dbConnection }