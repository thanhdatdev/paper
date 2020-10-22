require('./environment');
const AWS = require('aws-sdk');

AWS.config.update({
    region: 'ap-southeast-1',
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    endpoint: 'http://localhost:8000',
});