const { Router } = require('express');
const { get_all_support_requests, 
        get_support_request, 
        get_support_request_files,
        get_support_request_file,
        create_support_request, 
        create_support_request_file,
        update_support_request,
        update_support_request_file,
        remove_support_request,
        remove_support_request_files } = require('../controllers/support_request');

const router = Router();

router.get('/', get_all_support_requests);
router.get('/:id_support_request', get_support_request);
//router.get('/:id_support_request/files', get_support_request_files);
//router.get('/:id_support_request/files/:id_file', get_support_request_file);

router.post('/', create_support_request);
//router.post('/id_support_request/files', create_support_request_file);

router.put('/:id_support_request', update_support_request);
//router.put('/:id_support_request/files/:id_file', update_support_request_file);

router.delete('/:id_support_request', remove_support_request);
//router.delete('/:id_support_request/files/:id_file', remove_support_request_files);


module.exports = router;