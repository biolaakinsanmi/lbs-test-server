const { check } = require('express-validator');

const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();


// Validation rules.
var userValidate = [
    check('email', 'email Must be a valid email Address').isEmail().trim().escape().normalizeEmail(),
    check('firstName').isLength({ min: 3 })
    .withMessage('First Name Must Be at Least 3 Characters').trim().escape(),
    check('lastName').isLength({ min: 3 })
    .withMessage('Last Name Must Be at Least 3 Characters').trim().escape()
]
var clasroomValidate = [
    check('name').isLength({ min: 3 })
    .withMessage('Name Must Be at Least 3 Characters').trim().escape(),
    check('description').trim().escape()
]

router.get('/', (req, res) => res.send('This is the user and classroom server api!'));

// User Routes
router.get('/users', controllers.getUsers);
router.post('/users', userValidate, controllers.createUser);
router.put('/users/:userId', userValidate, controllers.updateUser);
router.get('/users/:userId', controllers.findUser);
router.delete('/users/:userId', controllers.deleteUser);

// Classroom Routes
router.get('/classrooms', controllers.getClassrooms);
router.post('/classrooms', clasroomValidate, controllers.createClassroom);
router.put('/classrooms/:classroomId', clasroomValidate, controllers.updateClassroom);
router.get('/classrooms/:classroomId', controllers.findClassroom);
router.delete('/classrooms/:classroomId', controllers.deleteClassroom);



module.exports = router
