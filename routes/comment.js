const { Router } = require('express');
const { get_comment, post_comment } = require('../controllers/comment');

const router = Router();

router.get('/:id?', get_comment);
router.post('/', post_comment);

module.exports = router;