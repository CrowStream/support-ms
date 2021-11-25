const { Schema, model } = require('mongoose');

const SupportResponseSchema = Schema({
    request_id: {
        type: Schema.Types.ObjectId,
        ref: 'SupportRequest'
    }
    responder: {
        type: String,
    },
    description: {
        type: String,
        required: [true, 'description must be provided']
    },
    files: [{
        type: String,
    }],
    __v: { 
        type: Number, 
        select: false
    }
});

module.exports = model('SupportResponse', SupportResponseSchema)