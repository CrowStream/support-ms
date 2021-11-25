const { Schema, model } = require('mongoose');

const CommentSchema = Schema({
    post_id: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    user_id: {
        type: String,
        require: [true, 'user_id must be provided']
    },
    description: {
        type: String,
        require: [true, 'description must be provided']
    },
    files: [{
        type: String,
    }],
    __v: { 
        type: Number, 
        select: false
    }
});


module.exports = model('Comment', CommentSchema)