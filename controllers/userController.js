const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const usersController = (User) => {
    const getUsers = async (req, res) => {
        const { query } = req;
        const response = await User.find(query);
        res.json(response);
    }

    const postUsers = async (req, res) => {
        const user = new User(req.body) ;
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();
        res.json(user);
    }

    const getUserById = async (req, res) => {
        const { params } = req;
        const response = await User.findById(params.userId);
        res.json(response);
    }

    const getUserByUserName = async (req, res) => {
        const { params } = req;
        const response = await User.findOne({
            "userName": params.userName
        });
        res.json(response);
    }

    const putUsers = async (req, res) => {
        const { body } = req;
        const response = await User.updateOne({
        _id: req.params.userId,
        },
        {
        $set:{
            firstName: body.firstName,
            lastName: body.lastName,
            userName: body.userName,
            password: await bcrypt.hash(body.password, 10),
            email: body.email,
            address: body.address,
            phone: body.phone
        }
        });
        res.json(response);
    }

    const deleteUserById = async (req, res) => {
        const id = req.params.userId;
        await User.findByIdAndDelete(id);
        res.status(202).json("User has been deleted.");
    }

    const postLogin = async (req, res) => {
        const { body } = req;
        var response;
        
        const savedUser = await User.findOne({
            "userName": body.userName
        });

        if(savedUser && await bcrypt.compare(body.password, savedUser.password)){
            const token = generateToken(savedUser);
            response = {menssage: "OK", token};
        }else{
            response = {menssage: "Invalid credentials"};
        }
        res.json(response);
    }

    const generateToken = savedUser => {
        const tokenPayload = {
            name: savedUser.name,
            usesrName: savedUser.userName,
            lastName: savedUser.lastName
        }

        return jwt.sign(tokenPayload, 'secret', { expiresIn: '3h'});
    }

    validateToken = async (res, req) => {
        const { body } = req;
        const token = body.token;
        var decoded = jwt.verify(token, 'secret');

        res.json(decoded);
    }

    return { getUsers, postUsers, getUserById, putUsers, deleteUserById, postLogin, validateToken, getUserByUserName };
}

module.exports = usersController;