const debug = require('debug')('Validator:log');
const WebsiteError = require('../errors/websiteError');

module.exports = (prop, schema) => async (request, _, next) => {
    try {
        // la "value" on s'en fiche on la récupère pas
        // request['body'] == request.body
        debug(request[prop]);
        await schema.validateAsync(request[prop]);
        next();
    } catch (error) {
        debug('error',error)
        // Je dois afficher l'erreur à l'utilisateur
        // STATUS HTTP pour une erreur de saise : 400
        // On réabille l'erreur en suivant notre propre normalisation
        next(new WebsiteError(error.details[0].message, 400 ));
    }
};
