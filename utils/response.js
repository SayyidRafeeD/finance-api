export const successResponse = (res, message, data = null, statusCode = 200) => {
    const response = {
        status: 'success',
        message,
    };

    if (data !== null) {
        response.data = data;
    }

    return res.status(statusCode).json(response);
};