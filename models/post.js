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