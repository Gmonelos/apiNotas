const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const { generateError } = require('../helpers.js');
const { createUser, getUser } = require('../db/users');
const { validateUser } = require('../validators/Schemas.js');



const newUserController = async(req, res, next) => {
    try {
        const { email, password } = req.body;



        if (!validateUser(email, password)) {
            throw generateError("Formato email o contraseña incorrectos", 400);
        }

        const id = await createUser(email, password);
        res.send({
            status: 'ok',
            message: `Usuario creado con id: ${id}`
        });

    } catch (error) {
        next(error)
    }

}


const loginController = async(req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!validateUser(email, password)) {
            throw generateError("Email o contraseña no válidos", 400);
        }

        const user = await getUser(email);

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw generateError('Usuario y contraseña no coinciden', 401) //Se usa un único error para no dar información de si nuestro usuario existe
        }

        const payload = { id: user.id }

        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });

        res.send({
            status: 'ok',
            data: token
        });

    } catch (error) {
        next(error)
    }

};

module.exports = {
    newUserController,
    loginController
}