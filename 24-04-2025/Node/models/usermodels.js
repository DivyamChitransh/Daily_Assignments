const Joi = require('joi');

const expenseSchema = Joi.object({
    title: Joi.string().required(),
    amount: Joi.number().positive().required(),
    date: Joi.date().iso().required()
});

module.exports = { expenseSchema };
