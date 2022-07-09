/**
 * On met en place un gestionnaire d'erreur, sous forme de middleware,
 * qui sera chargé de répondre à l'utilisateur
 * en cas de passage d'erreur à la function next()
 */
const debug = require('debug')('errorHandler');

const WebsiteError = require('../errors/websiteError');
const logger = require('../helpers/logger');

 /**
 * Error middleware
 */
// Attention, next obligatoire même s'il n'est pas utilisé
// express en a besoin pour faire la différence
// avec les middlewares classiques (request, response, next)
// pour les différencier, express va compter les paramètres indiqués dans la signature
// <= 3 params -> middleware classique
// == 4 params -> middleware de gestion d'erreur

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, _, response, next) => {
    debug('status code ', error.status)
    const teststatus = error.status;
    logger.error(error);
    // custom error
    if (error instanceof WebsiteError) {
        debug ('websiteError')
        return response.status(error.status).json(error.message);
    }
    // autres erreurs possibles : sûrement assez technique (pb code, sql, ...)
    // on envoie un message générique au front pour signaler un pépin
    // que seuls les backeux pourront régler
    return response.status(500).json('Internal server error');
};

module.exports = errorHandler;