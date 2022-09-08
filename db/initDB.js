require('dotenv').config();

const { getConnection } = require('./db');


async function main() {
    let connection;

    try {
        connection = await getConnection();

        console.log(`Borrando tablas existentes`);
        await connection.query(`DROP TABLE IF EXISTS notes`);
        await connection.query(`DROP TABLE IF EXISTS tags`);
        await connection.query(`DROP TABLE IF EXISTS users`);

        console.log('Creando tablas');


        await connection.query(`CREATE TABLE IF NOT EXISTS users (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            email VARCHAR(255) NOT NULL,
            password CHAR(60) NOT NULL,
            created_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            UNIQUE INDEX email_UNIQUE (email) );`);
        await connection.query(`CREATE TABLE IF NOT EXISTS tags (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(60)
        );  `)
        await connection.query(`REATE TABLE IF NOT EXISTS notes (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR (60) NOT NULL,
            content VARCHAR(255) NOT NULL,
            user_id INT UNSIGNED NOT NULL,
            tag_id INT UNSIGNED NOT NULL,
            is_public BOOLEAN,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (tag_id) REFERENCES tags(id) );
        `)

    } catch (error) {
        console.error
    } finally {
        if (connection) connection.release;
    }
}
main();