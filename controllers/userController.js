const { User, Classroom } = require('../models');
const { validationResult } = require('express-validator');


/**
 * Create a user
 * @param {*} req
 * @param {*} res
 */
const createUser = async (req, res) => {

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

    const firstName = req.body.firstName? req.body.firstName.trim() : null;
    const lastName = req.body.lastName? req.body.lastName.trim() : null;
    const email = req.body.email? req.body.email.trim() : null;
    classroomId = +req.body.classroomId || null;

    const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email
    }

    try {
        let classroom;

        if(classroomId) {
            classroom = await Classroom.findOne({
                where: {
                    id: classroomId
                }
            })

            if(classroom) {
                userData.classroomId = classroom.id
            }
        }

        const user = await User.create(userData);

        return res.status(201).json({
            user,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

/**
 * Get All Users
 * @param {*} req
 * @param {*} res
 */
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [
                {
                    model: Classroom
                }
            ]
        });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

/**
 * Find A User by Id
 * @param {*} req
 * @param {*} res
 */
const findUser = async (req, res) => {
    let { userId } = req.params;
    userId = +userId || null

    if(isNaN(userId)) {
        return res.status(500).json({message: 'Invalid user Id'});
    }

    try {
        const user = await User.findOne({
            where: {
                id: userId
            },
            include: [{ model: Classroom }]
        });

        if(!user) {
            return res.status(404).json({message: `User with id ${userId} not found.` });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

/**
 * Update A User
 * @param {*} req
 * @param {*} res
 */
const updateUser = async (req, res) => {
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

    let { userId } = req.params;
    let { firstName, lastName, email, classroomId } = req.body;

    userId = +userId || null;

    // need improvement to ehcck if new classroom id exists
    classroomId = +classroomId || null;

    const userData = {
        firstName,
        lastName,
        email,
        classroomId
    }

    if(isNaN(userId)) {
        return res.status(500).json({message: 'Invalid user Id'});
    }

    try {
        // todo - better way to improve code for DRY
        const userExist = await User.findOne({
            where: {
                id: userId
            }
        })

        if(!userExist) {
            return res.status(404).json({message: `User with Id ${userId} does not exist`});
        }

        await User.update(
            userData,
            {
                where: {
                    id: userId
                }
            }
        );

        // todo - better way to improve code for DRY
        const updatedUser = await User.findOne({
            where: {
                id: userId
            },
            include: [{ model: Classroom }]
        })

        return res.status(200).json({ updatedUser });
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

/**
 * delete User
 * @param {*} req
 * @param {*} res
 */
const deleteUser = async (req, res) => {
    let { userId } = req.params;

    userId = +userId || null;

    if(isNaN(userId)) {
        return res.status(500).json({message: 'Invalid user Id'});
    }

    try {
        User.destroy({
          where: {
            id: userId
          }
        })

        return res.status(200).json({message: `User with id ${userId} deleted`});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}


module.exports = {
    createUser,
    getUsers,
    findUser,
    updateUser,
    deleteUser
}