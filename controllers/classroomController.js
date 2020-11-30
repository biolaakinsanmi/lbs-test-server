const { Classroom, User } = require('../models');
const { validationResult } = require('express-validator');

/**
 * Create a classrooom
 * @param {} req
 * @param {*} res
 */
const createClassroom = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
        let message = '';
         errors.array().forEach(
            (e) => {
                message = `${message}. <br /> ${e.msg}`;
            }
        )
        return res.status(422).json({ message: message });
    }

    let { name, description} = req.body;

    try {
        const classroom = await Classroom.create({
            name,
            description
        });
        return res.status(201).json({
            classroom,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

/**
 * Get A Classroom
 * @param {*} req
 * @param {*} res
 */
const getClassrooms = async (req, res) => {
    try {
        const classrooms = await Classroom.findAll({
            include: [{  model: User }]
        });
        return res.status(200).json(classrooms);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const findClassroom = async (req, res) => {
    let { classroomId } = req.params;
    classroomId = +classroomId || null

    if(isNaN(classroomId)) {
        return res.status(500).json({message: 'Invalid classroom Id'});
    }

    try {
        const classroom = await Classroom.findOne({
            where: {
                id: classroomId
            },
            include: [{ model: User }]
        });

        if(!classroom) {
            return res.status(404).json({message: `Classroom with id ${classroomId} not found.`});
        }

        return res.status(200).json(classroom);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

/**
 * Update a classroom
 * @param {*} req
 * @param {*} res
 */
const updateClassroom = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
        let message = '';
         errors.array().forEach(
            (e) => {
                message = `${message}. <br /> ${e.msg}`;
            }
        )
        return res.status(422).json({ message: message });
    }

    let { classroomId } = req.params;
    let { name, description } = req.body;

    classroomId = +classroomId || null;

    const classroomData = {
        name,
        description
    }

    if(isNaN(classroomId)) {
        return res.status(500).json({message: 'Invalid classroom Id'});
    }

    try {
        // todo - better way to improve code for DRY
        const classroomExist = await Classroom.findOne({
            where: {
                id: classroomId
            }
        })

        if(!classroomExist) {
            return res.status(404).json({message: `Classroom with Id ${classroomId} does not exist`});
        }

        await Classroom.update(
            classroomData,
            {
                where: {
                    id: classroomId
                }
            }
        );

        // todo - better way to improve code for DRY
        const updatedClassroom = await Classroom.findOne({
            where: {
                id: classroomId
            },
            include: [{ model: User }]
        })

        return res.status(200).json({ updatedClassroom });
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

/**
 * Delete a classroom
 * @param {*} req
 * @param {*} res
 */
const deleteClassroom = async (req, res) => {
    let { classroomId } = req.params;

    classroomId = +classroomId || null;

    if(isNaN(classroomId)) {
        return res.status(500).json({message: 'Invalid classroom Id'});
    }

    try {
        Classroom.destroy({
          where: {
            id: classroomId
          }
        })

        return res.status(200).json({message: `Classroom with id ${classroomId} deleted` });
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}



module.exports = {
    createClassroom,
    getClassrooms,
    findClassroom,
    updateClassroom,
    deleteClassroom
}