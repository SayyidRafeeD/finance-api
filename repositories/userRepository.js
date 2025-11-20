import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import {
    getDummyUserByUsername,
    addDummyUser,
    getDummyUserById
} from '../data/dummyData.js';

const isDummyMode = process.env.DATA_MODE === 'dummy';

export const findUserByUsername = async (username) => {
    if (isDummyMode) {
        return await getDummyUserByUsername(username);
    }
    return await User.findOne({ username });
};

export const findUserById = async (id) => {
    if (isDummyMode) {
        return await getDummyUserById(id);
    }
    return await User.findById(id).select('-password');
};

export const createUser = async (userData) => {
    const { username, password } = userData;

    if (isDummyMode) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        return await addDummyUser({
            username,
            password: hashedPassword
        });
    }

    const user = await User.create({
        username,
        password
    });
    
    return user;
};