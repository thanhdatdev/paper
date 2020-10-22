const AWS = require('aws-sdk');

AWS.config.update({
    region: 'ap-southeast-1',
    accessKeyId: 'AKIAJ5LL673UJ7H7AITA',
    secretAccessKey: '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',
    endpoint: 'http://localhost:8000',
});

const docClient = new AWS.DynamoDB.DocumentClient();
const params = {
    TableName: 'Books',
};
console.log('Scanning Books table.');

docClient.scan(params, onScan);

function onScan(err, data) {
    if (err) {
        console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Scan succeeded.');
        data.Items.forEach((book) => {
            console.log(book.name, book.year, book.type, book.author);

        });

        if (typeof data.LastEvaluatedKey !== 'undefined') {
            console.log('Scanning for more...');
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
}