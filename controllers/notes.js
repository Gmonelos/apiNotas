const { createNote, deleteNote, getPublicNotes, getNotesByTag, getNotes, getSingleNote } = require('../db/notes');
const { generateError } = require('../helpers')

const getNotesController = async(req, res, next) => {
    const { userId } = req;

    const userNotes = getNotes(userId);
    try {
        res.send({
            status: '200',
            userNotes
        });

    } catch (error) {
        next(error)
    }

};

const getPublicNotesController = async(req, res, next) => {
    try {
        const publicNotes = getPublicNotes();
        res.send({
            status: 'error',
            publicNotes
        });
    } catch (error) {
        next(error)
    }

};

const getSingleNoteController = async(req, res, next) => {
    try {
        const note = getSingleNote();
        if (note.userId != req.userId) {
            generateError
            generateError('No tienes acceso a esta nota', 403)
        }

        res.send({
            status: '200',
            note
        })

    } catch (error) {
        next(error)
    }

};



const newNoteController = async(req, res, next) => {
    try {
        const { title, content, tagId, isPublic } = req.body;
        const id = await createNote(req.userId, title, content, tagId, isPublic);

        res.send({
            status: '200',
            message: `Nota creada con id ${id}`
        });

    } catch (error) {
        next(error)
    }

};

const deleteNoteController = async(req, res, next) => {
    try {
        const { id } = req.params;
        const note = getSingleNote(id);
        if (note.userId != req.userId) {
            generateError('No tienes acceso a esta nota', 403)
        }
        deleteNote(id);
        res.send({
            status: '200',
            message: `Nota borrada con id ${id}`
        });

    } catch (error) {
        next(error)
    }
};

module.exports = {
    getNotesController,
    getPublicNotesController,
    getSingleNoteController,
    newNoteController,
    deleteNoteController,
}