import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import {
    getDummyUserByUsername,
    addDummyUser,
    getDummyUserById
} from '../data/dummyData.js';

export const findUserByUsername = async (username) => {
    const currentMode = process.env.DATA_MODE ? process.env.DATA_MODE.trim() : 'undefined';
    
    if (currentMode === 'dummy') {
        return await getDummyUserByUsername(username);
    }
    return await User.findOne({ username });
};

export const findUserById = async (id) => {
    const currentMode = process.env.DATA_MODE ? process.env.DATA_MODE.trim() : 'undefined';
    
    if (currentMode === 'dummy') {
        return await getDummyUserById(id);
    }
    return await User.findById(id).select('-password');
};

export const createUser = async (userData) => {
    const { username, password } = userData;
    const currentMode = process.env.DATA_MODE ? process.env.DATA_MODE.trim() : 'undefined';

    if (currentMode === 'dummy') {
        console.log('[Repo] Creating user in Dummy mode');
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

export const verifyPassword = async (user, enteredPassword) => {
    if (typeof user.matchPassword === 'function') {
        return await user.matchPassword(enteredPassword);
    }
    
    if (user.password) {
        return await bcrypt.compare(enteredPassword, user.password);
    }

    return false;
};