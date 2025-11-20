import asyncHandler from '../middleware/asyncHandler.js';
import * as userRepo from '../repositories/userRepository.js'; 
import generateToken from '../utils/generateToken.js';
import { successResponse } from '../utils/response.js';

const registerUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const userExists = await userRepo.findUserByUsername(username);

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await userRepo.createUser({
        username,
        password,
    });

    if (user) {
        generateToken(res, user._id);
        return successResponse(res, 'Registrasi berhasil', {
            _id: user._id,
            username: user.username
        }, 201);
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await userRepo.findUserByUsername(username);

    if (user && (await userRepo.verifyPassword(user, password))) {
        generateToken(res, user._id);
        return successResponse(res, 'Login berhasil', {
            _id: user._id,
            username: user.username
        });
    } else {
        res.status(401);
        throw new Error('Invalid username or password');
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    return successResponse(res, 'Logout berhasil');
});

export {
    registerUser,
    loginUser,
    logoutUser
};