const { generateError } = require('../helpers.js');

const getAllTagsController = async(req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'not implemented'
        });

    } catch (error) {
        next(error)
    }

};

const getTagController = async(req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'not implemented'
        });

    } catch (error) {
        next(error)
    }

};
const newTagController = async(req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'not implemented'
        });

    } catch (error) {
        next(error)
    }

};
const deleteTagController = async(req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'not implemented'
        });

    } catch (error) {
        next(error)
    }

}




module.exports = {
    getTagController,
    newTagController,
    deleteTagController,
    getAllTagsController
}