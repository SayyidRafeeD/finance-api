export const DATA_MODES = {
    DUMMY: 'dummy',
    MONGODB: 'mongodb'
};

export const TRANSACTION_TYPES = {
    INKbOME: 'income',
    EXPENSE: 'expense'
};

export const isDummyMode = () => {
    return (process.env.DATA_MODE && process.env.DATA_MODE.trim() === DATA_MODES.DUMMY);
};