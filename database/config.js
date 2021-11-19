const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect('mongodb://root:pass@mongo:27017/', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database initializated.');
    } catch (error) {
        console.error(error)
        throw new Error('Error initializing the database.');
    }
}


module.exports = { dbConnection }