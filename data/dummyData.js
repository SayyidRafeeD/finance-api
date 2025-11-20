let transactions = [
    {
        _id: 'tx1',
        user: 'dummyUserId1',
        text: 'Gaji Bulanan',
        amount: 5000000,
        type: 'income',
        createdAt: newXsDate(),
        updatedAt: new Date()
    },
    {
        _id: 'tx2',
        user: 'dummyUserId1',
        text: 'Makan Siang',
        amount: 25000,
        type: 'expense',
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getDummyTransactions = async (userId, type) => {
    await delay(100);
    let result = transactions.filter(t => t.user === userId);
    
    if (type) {
        result = result.filter(t => t.type === type);
    }
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
    const index = transactions.findIndex(t => t._id === transactionId && t.user === userId);
    
    if (index !== -1) {
        const deleted = transactions.splice(index, 1);
        return deleted[0];
    }
    return null;
};