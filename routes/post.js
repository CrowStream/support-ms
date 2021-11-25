const { Router } = require('express');
const { get_all_posts, get_post, create_post, update_post, remove_post } = require('../controllers/post');

const router = Router();

router.get('/', get_all_posts);
router.get('/:id', get_post);
router.post('/', create_post);
router.put('/:id', update_post);
router.delete('/:id', remove_post);

module.exports = router;