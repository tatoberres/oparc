const Joi = require('joi');

module.exports = Joi.object({
    description: Joi.string(),
    operator_name: Joi.string(),
    attraction_id: Joi.string().pattern(new RegExp('^[0-9]*$')),
    end_time_resolution: Joi.string().allow(''),
}).min(1).required();
