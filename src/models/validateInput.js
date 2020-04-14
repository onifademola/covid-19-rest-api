const Joi = require('joi');

function validateInput(customer) {
    const schema = {
        region: Joi.object({
            name: Joi.string().required(),
            avgAge: Joi.number().required(),
            avgDailyIncomeInUSD: Joi.number().required(),
            avgDailyIncomePopulation: Joi.number().required()
        }).required(),
        periodType: Joi.string().required(),
        timeToElapse: Joi.number().required(),
        reportedCases: Joi.number().required(),
        population: Joi.number().required(),
        totalHospitalBeds: Joi.number().required()
    };
    return Joi.validate(customer, schema);
};

module.exports = validateInput;