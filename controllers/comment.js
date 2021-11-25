const { request, response } = require('express');
const comment = require('../models/comment');

const get_comment = (req = request, res = response) => {
    const id = request.params.id;
    res.json({
        "msg": "test",
        "id": id
    });
}

const post_comment = async (req = request, res = response) => {
    const body = req.body;
    const c = new comment();

    await c.save();

    res.json(c);

}


module.exports = {
    get_comment,
    post_comment
}