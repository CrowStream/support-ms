const { Router } = require('express');
const { get_all_support_responses, get_support_response, create_support_response, update_support_response, remove_support_response } = require('../controllers/support_response');

const router = Router();

router.get('/', get_all_support_responses);
router.get('/:id', get_support_response);
router.post('/', create_support_response);
router.put('/:id', update_support_response);
router.delete('/:id', remove_support_response);

module.exports = router;