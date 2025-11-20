import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import * as userRepo from '../repositories/userRepository.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        res.status(401);
        throw new Error('Not authorized, token failed');
    }

    try {
        req.user = await userRepo.findUserById(decoded.userId);
        
        if (!req.user) {
            res.status(401);
            throw new Error('Not authorized, user not found (Server Restarted?)');
        }

        next();
    } catch (error) {
        res.status(401);
        throw new Error(error.message || 'Authentication failed');
    }
});

export { protect };