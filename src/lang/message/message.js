const MESSAGES = {
    1001: 'Response get successfully.',
    1002: 'User not registered. Please register first.',
    
    2001: 'Subscription expired',
    2002: 'Subscription validated successfully.',

    3001: 'Category list get successfully.',
    3002: 'Category not found.',

    9000: 'Something went wrong!',
};

const getMessage = function (messageCode) {
    if (isNaN(messageCode)) {
        return messageCode;
    }
    return messageCode ? MESSAGES[messageCode] : '';
};

export default getMessage;
