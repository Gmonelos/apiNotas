const bcrypt = require('bcrypt');

const { generateError } = require('../helpers.js');
const { createUser, getUser } = require('../db/users');



const newUserController = async(req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw generateError("Debes enviar email y contraseña", 400);
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

        if (!email || !password) {
            throw generateError("Debes enviar email y contraseña", 400);
        }

        const user = await getUser(email);

        const validPassword =


            res.send({
                status: 'error',
                message: 'not implemented'
            });

    } catch (error) {
        next(error)
    }

};

module.exports = {
    newUserController,
    loginController
}