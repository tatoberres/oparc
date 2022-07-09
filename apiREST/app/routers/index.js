const { Router } = require('express');
const ApiError = require('../errors/apiError');
const apiRouter = require('./apiRouter');
const errorHandler = require('../errors/errorHandler');

const router = Router();

router.use(apiRouter);

router.use(() => {
    throw new ApiError('Endpoint not found', 404);
});

router.use(errorHandler);

module.exports = router;
