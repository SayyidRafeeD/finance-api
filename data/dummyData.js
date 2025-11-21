import { TRANSACTION_TYPES } from '../utils/constants.js'; // Import constant biar konsisten

const users = []; 

const transactions = [];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const seedWelcomeData = (userId) => {
    const now = new Date();
    return [
        {
            _id: `tx_welcome_1_${Date.now()}`, 
            user: userId,
            text: 'Saldo Awal (Welcome Bonus)',
            amount: 5000000,
            type: TRANSACTION_TYPES.INCOME,
            createdAt: now,
            updatedAt: now
        },
        {
            _id: `tx_welcome_2_${Date.now()}`,
            user: userId,
            text: 'Biaya Admin (Simulasi)',
            amount: 25000,
            type: TRANSACTION_TYPES.EXPENSE,
            createdAt: now,
            updatedAt: now
        }
    ];
};

export const getDummyTransactions = async (userId, type) => {
    await delay(100);
    let result = transactions.filter(t => t.user.toString() === userId.toString());
    if (type) result = result.filter(t => t.type === type);
    return result;
};

export const addDummyTransaction = async (transactionData) => {
    await delay(100);
    const newTx = {
        _id: `tx${Date.now()}`,
        ...transactionData,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    transactions.push(newTx);
    return newTx;
};

export const deleteDummyTransaction = async (transactionId, userId) => {
    await delay(100);
    const index = transactions.findIndex(t => t._id === transactionId && t.user.toString() === userId.toString());
    if (index !== -1) {
        const deleted = transactions.splice(index, 1);
        return deleted[0];
    }
    return null;
};

export const getDummyUserByUsername = async (username) => {
    await delay(100);
    return users.find(u => u.username === username);
};

export const getDummyUserById = async (id) => {
    await delay(100);
    return users.find(u => u._id.toString() === id.toString());
};

export const addDummyUser = async (userData) => {
    await delay(100);
    
    const newUser = {
        _id: `user${Date.now()}`,
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    users.push(newUser);

    const starterPack = seedWelcomeData(newUser._id);
    transactions.push(...starterPack);

    console.log(`[DummyDB] User ${newUser.username} created with ${starterPack.length} starter transactions.`);
    
    return newUser;
};