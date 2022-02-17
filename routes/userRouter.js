const express = require('express');
const usersController = require('../controllers/userController');
const userValidation = require('../validations/userValidation');

const routes = (User) => {
    const userRouter = express.Router();

    const { getUsers, postUsers, getUserById, putUsers, deleteUserById, postLogin, validateToken, getUserByUserName } = usersController(User);

    userRouter.route('/users')
    .get(getUsers)
    .post(userValidation, postUsers) 

    userRouter.route('/users/:userId')
    .get(getUserById)
    .put(userValidation, putUsers)
    .delete(deleteUserById )

    userRouter.route('/users/:userName/details')
    .get(getUserByUserName)

    userRouter.route('/users/login')
    .post(postLogin) 
    
    userRouter.route('/users/login/validate')
    .get(validateToken) 

    return userRouter;
}
module.exports = routes;