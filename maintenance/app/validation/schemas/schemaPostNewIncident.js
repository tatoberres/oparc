const Joi = require('joi');


module.exports = Joi.object({
    description: Joi.string()
        .required(),
    operator_name: Joi.string().required(),
    attraction_id: Joi.string().pattern(new RegExp('^[0-9]*$')).required()
}).required();
