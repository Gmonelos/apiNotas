const { generateError } = require('../helpers.js');

const getNotesController = async(req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'not implemented'
        });

    } catch (error) {
        next(error)
    }

};

const getPublicNotesController = async(req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'not implemented'
        });
    } catch (error) {
        next(error)
    }

};

const getSingleNoteController = async(req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'not implemented'
        })

    } catch (error) {
        next(error)
    }

};



const newNoteController = async(req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'not implemented'
        });

    } catch (error) {
        next(error)
    }

};

const deleteNoteController = async(req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'not implemented'
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