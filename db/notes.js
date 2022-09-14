const { getConnection } = require('./db');

const createNote = async(userId, title, content, tagId = null, isPublic = false) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query('INSERT INTO notes(user_id,title, content, tag_id, isPublic) VALUES (?,?,?,?,?)', [userId, title, content, tagId, isPublic]);

        return result.insertId;

    } finally {
        if (connection) connection.release
    }
}

const deleteNote = async(noteId) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query('DELETE FROM notes WHERE id = ?' [noteId]);

        return result.insertId;

    } finally {
        if (connection) connection.release
    }
}

const getNotes = async(userId) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query('SELECT FROM notes WHERE user_id = ?' [userId]);

        return result;

    } finally {
        if (connection) connection.release
    }
}
const getPublicNotes = async() => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query('SELECT FROM notes WHERE isPublic');

        return result;

    } finally {
        if (connection) connection.release
    }
}
const getSingleNote = async(noteId) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query('SELECT FROM notes WHERE id = ?' [noteId]);

        return result;

    } finally {
        if (connection) connection.release
    }
}

const getNotesByTag = async(userId, tagId) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query('SELECT FROM notes WHERE (user_id = ? && tag_id = ?)' [userId, tagId]);

        return result;

    } finally {
        if (connection) connection.release
    }
}



module.exports = { createNote, deleteNote, getNotes, getPublicNotes, getSingleNote, getNotesByTag };