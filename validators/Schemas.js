const Joi = require("joi");


const validateUser = (email, password) => {
    // Definimos schema y comprobamos con postman
    const user = { email, password };

    const registerValidator = Joi.object({
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),

    });

    return registerValidator.validate(user);
};

module.exports = { validateUser };