const { getConnection } = require('./db');

const getTags = async() => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query('SELECT * FROM tags');

        return result;

    } finally {
        if (connection) connection.release
    }
}

const getTagById = async(tagId) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query('SELECT * FROM tags where tag_id = ?', [tagId]);

        return result;

    } finally {
        if (connection) connection.release
    }
}

const deleteTag = async(tagId) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query('UPDATE notes SET tag_id = NULL WHERE tag_id = ?' [tagId]);
        await connection.query('DELETE FROM tags WHERE id = ?', [tagId])

    } finally {
        if (connection) connection.release
    }
};
const createTag = async(tagName) => {
    let connection;
    try {
        connection = await getConnection();

        const [result] = await connection.query('INSERT INTO tags(name) VALUES (?)', [tagName]);

        return result.insertId;

    } finally {
        if (connection) connection.release
    }
}



module.exports = { getTags, deleteTag, createTag, getTagById }