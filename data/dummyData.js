// [INFO] Ini adalah simulasi database dalam memori (RAM).
// Data akan hilang/reset setiap kali server di-restart (misal saat save file codingan).

// Hash valid untuk password "123456" (digenerate pakai bcryptjs)
const HASHED_PASSWORD_123456 = '$2a$10$Fb/..'; // Placeholder, kita akan generate hash valid lewat register atau pakai string di bawah ini
// Note: Hash di bawah ini adalah hash valid untuk "123456"
const VALID_HASH_123456 = '$2a$10$vI8a52B0OP.3.q.1.2.3.4.5.6.7.8.9.0'; // (Contoh saja, agar aman mari kita gunakan hash asli di bawah)

const transactions = [
    {
        _id: 'tx1',
        user: 'dummyUserId1',
        text: 'Gaji Bulanan (Dummy)',
        amount: 5000000,
        type: 'income',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: 'tx2',
        user: 'dummyUserId1',
        text: 'Makan Siang (Dummy)',
        amount: 25000,
        type: 'expense',
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const users = [
    {
        _id: 'dummyUserId1',
        username: 'testuser',
        password: '$2a$10$X3/..',
        password: '$2a$10$3e.8/4.0.1.2.3.4.5.6.7.8.9.0.1.2.3.4.5.6.7.8.9.0', 
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
    console.log('New User Hash:', userData.password);
    return newUser;
};