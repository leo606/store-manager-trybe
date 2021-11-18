const express = require('express');

const router = express.Router({ mergeParams: true });

router.get('/:id', require('./get'));
router.put('/:id', require('./update'));
router.post('/', require('./create'));
router.get('/', require('./list'));
router.delete('/', require('./delete'));

module.exports = router;