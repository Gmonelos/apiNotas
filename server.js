require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const { PORT } = process.env;
const {
    newUserController,
    getUserController,
    loginController,
} = require('./controllers/users.js');
const {
    getNotesController,
    getPublicNotesController,
    getSingleNoteController,
    newNoteController,
    deleteNoteController,
} = require('./controllers/notes.js');
const {
    getTagController,
    newTagController,
    deleteTagController,
    getAllTagsController
} = require('./controllers/tags.js')

const app = express();

app.use(express.json());
app.use(morgan('dev'));

//Endpoints
app.post('/user', newUserController);
app.get('/user/:id', getUserController);
app.post('/login', loginController);

app.get('/', getNotesController);
app.post('/', newNoteController);
app.get('/public', getPublicNotesController);
app.get('/note/:id', getSingleNoteController);
app.delete('/note/:id', deleteNoteController);

app.get('/tags', getAllTagsController);
app.get('/tag/:id', getTagController);
app.post('/tags', newTagController);
app.delete('/tag/:id', deleteTagController);




//Errores
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found'
    });
});

app.use((error, req, res, next) => {
    res.status(error.httpStatus || 500).send({
        status: 'error',
        message: error.message
    });
});

app.listen(PORT, () => {
    console.log('Servidor funcionando!');
})