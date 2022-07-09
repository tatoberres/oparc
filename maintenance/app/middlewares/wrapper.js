/**
 * Controller wrapper to manage errors
 */

module.exports = (controllerMethod) => async (req, res, next) => {
    try {
        return await controllerMethod(req, res, next);
    } catch (err) {
        next(err);
    }
};