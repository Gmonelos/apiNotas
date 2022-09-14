const { getTags, getTagById, createTag, deleteTag } = require('../db/tag.js');
const { generateError } = require('../helpers.js');

const getAllTagsController = async(req, res, next) => {
    try {
        const tags = await getTags();
        res.send({
            status: '200',
            message: '',
            tags
        });

    } catch (error) {
        next(error)
    }

};

const getTagController = async(req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            generateError('Wrong parameters', 400)
        }
        const tag = getTagById(id);


        res.send({
            status: '200',
            message: '',
            tag
        });

    } catch (error) {
        next(error)
    }

};
const newTagController = async(req, res, next) => {
    const { name } = req.body;
    const id = createTag(name);


    try {
        res.send({
            status: '200',
            message: `Nuevo tag ${name} creado con id ${id}`
        });

    } catch (error) {
        next(error)
    }

};
const deleteTagController = async(req, res, next) => {
    const { id } = req.params;

    if (!id) {
        generateError('Faltan parámetros', 400)
    }
    deleteTag(id);


    try {
        res.send({
            status: '200',
            message: `Tag con id${id} borrado`
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