const { Schema, model } = require('moongose')

const PostSchema = Schema({
    field: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    }
});


module.exports = model('Posts', PostSchema)