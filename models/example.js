const { Schema, model } = require('moongose')

const ExampleSchema = Schema({
    field: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    }
});


module.exports = model('Examples', ExampleSchema)