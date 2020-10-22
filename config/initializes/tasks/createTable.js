require('../../db/database');

const AWS = require('aws-sdk');
let dynamodb = new AWS.DynamoDB();

let paramsStudents = {
    TableName: "Students",
    KeySchema: [
        { AttributeName: "id_student", KeyType: "HASH" },
    ],


    AttributeDefinitions: [
        { AttributeName: "id_student", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

let paramsClasses = {
    TableName: "Classes",
    KeySchema: [
        { AttributeName: "id_class", KeyType: "HASH" }
    ],
    AttributeDefinitions: [
        { AttributeName: "id_class", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};


createTable(paramsStudents);
createTable(paramsClasses);

function createTable(params) {
    dynamodb.createTable(params, (err, data) => {
        if (err) {
            console.error(`Something went wrong ${JSON.stringify(err,null,2)}`);
        } else {
            console.log(`Created table ${JSON.stringify(data, null, 2)}`);
        }
    });
}