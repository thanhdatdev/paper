const uuidv1 = require('uuid');
require('../../db/database');

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const idGeneratorClasses = uuidv1.v1();
const id_class = 'L1';
const class_name = 'Lớp toán';

const idGeneratorStudents = uuidv1.v1();
const id_student = 'SV1';
const name_student = 'Nguyễn Lê Thành Đạt';
const year = 1999;
const avata = 'null';

const paramsClasses = {
    TableName: 'Classes',
    Item: {
        idGeneratorClasses,
        id_class,
        class_name
    },
};

const paramsStudent = {
    TableName: 'Students',
    Item: {
        idGeneratorStudents,
        id_student,
        name_student,
        year,
        id_class,
        avata
    },
};

createInstance(paramsClasses);
createInstance(paramsStudent);

function createInstance(params) {
    console.log('Adding a new instance...');
    docClient.put(params, (err, data) => {
        if (err) {
            console.error('Unable to add instance. Error JSON:', JSON.stringify(err, null, 2));
            return false;
        } else {
            console.log('Added An Instance', JSON.stringify(params));
            return true;
        }
    });
    return true;
}