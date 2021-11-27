const { Schema, model } = require('mongoose');

const SupportRequestSchema = Schema({
    user_id: {
        type: String,
        required: [true, 'user_id must be provided']
    },
    request_type: {
        type: String,
        required: [true, 'request_type must be provided'],
        enum: ['COMPLAIN', 'DOUBT', 'SUGGESTION', 'CLAIM']
    },
    description: {
        type: String,
        required: [true, 'description must be provided']
    },
    response_id: {
        type: Schema.Types.ObjectId,
        ref: 'SupportResponse'
    },
    files: [{
        type: String,
    }],
    __v: { 
        type: Number, 
        select: false
    }
});

module.exports = model('SupportRequest', SupportRequestSchema)