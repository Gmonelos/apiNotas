const { getConnection } = require('./db');
const { generateError } = require('../helpers');
const bcrypt = require('bcrypt');

const createUser = async(email, password) => {
    let connection;
    try {
        connection = await getConnection();
        const [user] = await connection.query(`SELECT id FROM users WHERE email = ?`, [email]);
        if (user.length > 0) {
            throw generateError("Ya existe un usuario con este email", 409)
        }
        const passwordHash = await bcrypt.hash(password, 8);

        const [newUser] = await connection.query('INSERT INTO users (email, password) VALUES (?,?)', [email, passwordHash]);

        return newUser.insertId;

    } finally {
        if (connection) connection.release();
    }
}

const getUser = async(email) => {
    const connection = await getConnection();
    const [result] = await connection.query(
        'SELECT id, email,password FROM users WHERE email = ?', [email]
    )
    if (result.length === 0) {
        throw generateError("No hay usuario con ese email", 404)
    }
    return result[0];
}

module.exports = {
    createUser,
    getUser
}