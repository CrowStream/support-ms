const { Router } = require('express');
const { get_post } = require('../controllers/post');

const router = Router();

router.get('/:id?', get_post);

module.exports = router