const { createUser, getUsers, findUser, updateUser, deleteUser } = require('./userController');
const { createClassroom, getClassrooms, findClassroom, updateClassroom, deleteClassroom } = require('./classroomController');

module.exports = {
    createUser,
    getUsers,
    findUser,
    updateUser,
    deleteUser,

    createClassroom,
    getClassrooms,
    findClassroom,
    updateClassroom,
    deleteClassroom,
}