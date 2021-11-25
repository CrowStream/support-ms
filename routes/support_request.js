const { Router } = require('express');
const { get_all_support_requests, get_support_request, create_support_request, update_support_request, remove_support_request } = require('../controllers/support_request');

const router = Router();

router.get('/', get_all_support_requests);
router.get('/:id', get_support_request);
router.post('/', create_support_request);
router.put('/:id', update_support_request);
router.delete('/:id', remove_support_request);

module.exports = router;