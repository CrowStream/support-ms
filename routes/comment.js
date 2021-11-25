const { Router } = require('express');
const { get_all_comments, get_comment, create_comment, update_comment, remove_comment } = require('../controllers/comment');

const router = Router();

router.get('/', get_all_comments);
router.get('/:id', get_comment);
router.post('/', create_comment);
router.put('/:id', update_comment);
router.delete('/:id', remove_comment);

module.exports = router;