var mode = "dev"
var MONGO_URL

if(mode === "dev"){
    MONGO_URL = 'mongodb://127.0.0.1:27017/admin-panel'
}else if(mode === "prod"){
    MONGO_URL = process.env.MONGO_URL
}

const statusMessages = {
    100: 'Continue',
    101: 'Switching Protocols',
    102: 'Processing',
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    204: 'No Content',
    206: 'Partial Content',
    300: 'Multiple Choices',
    301: 'Moved Permanently',
    302: 'Found (Temporary Redirect)',
    303: 'See Other',
    304: 'Not Modified',
    307: 'Temporary Redirect',
    308: 'Permanent Redirect',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    409: 'Duplicate Record',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Payload Too Large',
    415: 'Unsupported Media Type',
    422: 'Unprocessable Entity',
    429: 'Too Many Requests',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported',
    507: 'Insufficient Storage',
    508: 'Loop Detected',
}

const resMessages = {
    insert: 'Data inserted successfully',
    update: 'Data updated successfully',
    delete: 'Data deleted successfully',
    notexist: 'Data not exist',
    error: 'Internal server error',
    token: 'Token generated',
    emailinuse: 'Email is already in use. Please choose a different email or sign in.',
    signin: 'Sign In successful',
    login: 'Log In successful',
    usernotexist: 'User does not exist. Please check your email or sign up for an account.',
    wrongpass: 'Incorrect email or password',
}


const sendResponse = (req,res) =>{
    let response = req.responseData
    let status = response.status

    res.status(status).json(response)
}


export {
    MONGO_URL,
    resMessages,
    statusMessages,
    sendResponse
}