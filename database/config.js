const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        });
        console.log('Database initializated.');
    } catch (error) {
        throw new Error('Error initializing the database.');
    }
}


module.exports = { dbConnection }