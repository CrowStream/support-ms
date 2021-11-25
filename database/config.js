const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_ROOT_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'support_db'
        });
        console.log('Database initializated.');
    } catch (error) {
        console.error(error)
        throw new Error('Error initializing the database.');
    }
}


module.exports = { dbConnection }