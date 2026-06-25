const Joi = require('joi');

const updateCommentSchema = Joi.object({
    content: Joi.string().min(1).max(500).required().messages({
        'string.empty': 'El contenido no puede estar vacío',
        'string.max': 'El contenido no puede superar los 500 caracteres',
        'any.required': 'El contenido es obligatorio',
    })
});

module.exports = updateCommentSchema;