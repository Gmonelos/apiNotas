const jwt = require('jsonwebtoken');
const { generateError } = require("../helpers");

const authUser = (req, res, next) => {
    try {
        console.log(req.headers)
        const { authorization } = req.headers.authorization;
        if (!authorization) {
            throw generateError('Sin usuario', 401);
        }
        let token;
        try {
            token = jwt.verify(authorization.process.env.SECRET);
        } catch {
            throw generateError('Token incorrecto', 401)
        }
        req.userId = token.id;

        next();

    } catch (error) {
        next(error)
    }
};

module.exports = {
    authUser
}