const Joi = require('joi');

const commentSchema = Joi.object({
    content: Joi.string().min(1).max(500).required().messages({
        'string.empty': 'El contenido no puede estar vacío',
        'string.max': 'El contenido no puede superar los 500 caracteres',
        'any.required': 'El contenido es obligatorio',
     }),
    user: Joi.string().hex().length(24).required().messages({ 
        'string.base': 'El user debe ser un ObjectId válido',
        'string.length': 'El user debe tener 24 caracteres',
        'any.required': 'El user es obligatorio',
    }),
    post: Joi.string().hex().length(24).required().messages({
        'string.base': 'El post debe ser un ObjectId válido',
        'string.length': 'El post debe tener 24 caracteres',
        'any.required': 'El post es obligatorio',
    }),
    createdAt: Joi.date().iso().optional()
});

module.exports = commentSchema;


