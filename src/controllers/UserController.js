const catchError = require('../utils/catchError')
const User = require('../models/User')

const getAll = catchError(async (req, res) => {
    const getAllUsers = await User.findAll()

    return res.status(200).json(getAllUsers)
})

const createUser = catchError(async (req, res) => {
    const userCreated = await User.create(req.body)

    return res.status(201).json(userCreated)
})

const getUserById = catchError(async (req, res) => {
    const { id } = req.params;
    const getUser = await User.findByPk(id)
    if(!getUser) return res.status(404).json({error: `User with id: ${id} not found`})

    return res.status(200).json(getUser)
})

const deleteUserById = catchError(async (req, res) => {
    const { id } = req.params;
    const userDeleted = await User.destroy({where: {id}})
    if(!userDeleted) return res.status(404).json({error: `User with id: ${id} not found`})

    res.status(200).json({message: `User with id: ${id} deleted`})
})

const updateById = catchError(async (req, res) => {
    const { id } = req.params;

    const userUpdated = await User.update(req.body, {where: { id }, returning: true})
    if(userUpdated[0] === 0) return res.status(404).json({error: `User with id: ${id} not found`})

    return res.status(200).json(userUpdated[1][0])
})

module.exports = {
    getAll,
    createUser,
    getUserById,
    deleteUserById,
    updateById
}