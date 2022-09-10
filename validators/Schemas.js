const Joi = require("joi"); 
app.post("/register", async (req, res) => {

    try {

    // Definimos schema y comprobamos con postman
    const schema = Joi.object({
        username: Joi.string().min(6).alphanum().uppercase().required(),   
        password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        confirm_password:Joi.string().equal(Joi.ref('password')).messages({'any.only': 'password does not match' }).required(),
        firstname: Joi.string().required(),
        lastname: Joi.string(),
        email: Joi.string().email({minDomainSegments: 2}).required(),

    });

    const validation = schema.validate(req.body);
    const { value, error } = validation;

    if (error) {
        const message = error.details.map(x => x.message);
    
        res.status(400).json({
            status: "error",
            message: "Invalid request data",
            data: message
    });
        } else {
        res.json({
            status: "success",
            message: "Registration successful",
            data: value
    });
        }
        } catch (error) {
        res.json({status:"failed",message:error.message})
    }
    });