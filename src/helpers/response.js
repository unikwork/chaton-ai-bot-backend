import { getMessage } from '../lang/index.js';

const successRes = function (res, messageCode = null, data = null) {
    let response = {};
    response.success = true;
    response.message = getMessage(messageCode);
    response.data = data;
    return res.send(response);
};

const errorRes = function (res, messageCode, error = '', statusCode = 422) {
    let response = {};
    response.success = false;
    response.message = getMessage(messageCode);
    if (error != '') {
        response.error = error.toString();
    }
    statusCode = messageCode == 9999 ? 500 : statusCode;
    return res.status(statusCode).send(response);
};

export { successRes, errorRes };
