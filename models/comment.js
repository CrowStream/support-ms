const { Schema, model } = require('mongoose');

const CommentSchema = Schema({
    id: {
        type: Schema.Types.ObjectId
    },
    user_id: {
        type: String,
        require: [true, 'user_id must be provided']
    },
    description: {
        type: String,
        require: [true, 'description must be provided']
    },
    files: [String]
});


module.exports = model('Comment', CommentSchema)