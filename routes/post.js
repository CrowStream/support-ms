const amqplib = require('amqplib');
const { Router } = require('express');

const { get_all_posts, 
        get_post, 
        get_post_comments,
        get_post_comment,
        get_post_files,
        get_post_file,
        create_post, 
        create_post_comment,
        create_post_file,
        update_post,
        update_post_comment,
        update_post_file,
        remove_post,
        remove_post_comment,
        remove_post_files} = require('../controllers/post');

const router = Router();

router.get('/', get_all_posts);
router.get('/:id_post', get_post);
//router.get('/:id_post/comments/', get_post_comments);
//router.get('/:id_post/comments/:id_comment', get_post_comment);
//router.get('/:id_post/files/', get_post_files);
//router.get('/:id_post/files/:id_file', get_post_file);

router.post('/', create_post);
router.post('/:id_post/comments', create_post_comment);
//router.post('/:id_post/files', create_post_file);

router.put('/:id_post', update_post);
//router.put('/:id_post/comments/:id_comment', update_post_comment);
//router.put('/:id_post/files/:id_file', update_post_file);

router.delete('/:id_post', remove_post);
//router.delete('/:id_post/comments/:id_comment', remove_post_comment);
//router.delete('/:id_post/files/:id_file', remove_post_files);


module.exports = router;