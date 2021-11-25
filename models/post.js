const { Schema, model } = require('mongoose');

const PostSchema = Schema({
    user_id: {
        type: String,
        required: [true, 'user_id must be provided']
    },
    description: {
        type: String,
        required: [true, 'description must be provided']
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    files: [{
        type: String,
    }],
    __v: { 
        type: Number, 
        select: false
    }
});

module.exports = model('Post', PostSchema)