const { Router } = require('express');
const websiteRouter = require('./websiteRouter');
const WebsiteError = require('../errors/websiteError');
const errorHandler = require('../errors/errorHandler');

const router = Router();

router.use(websiteRouter);

router.use(() => {
    throw new WebsiteError('Endpoint not found', 404);
});

router.use(errorHandler);

module.exports = router;