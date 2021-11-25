const { request, response } = require('express');

const get_post = (req = request, res = response) => {
    const id = request.params.id;
    res.json({
        "msg": "test",
        "id": id
    });
}


module.exports = {
    get_post
}