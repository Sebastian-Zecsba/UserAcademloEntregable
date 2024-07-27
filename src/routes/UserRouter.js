const express = require('express');
const { getAll, createUser, getUserById, deleteUserById, updateById } = require('../controllers/UserController');


const userRouter = express.Router()

userRouter.route('/')
    .get(getAll)
    .post(createUser)

userRouter.route('/:id')
    .get(getUserById)
    .delete(deleteUserById)
    .put(updateById)


module.exports = userRouter