require('../../config/db/database');

const AWS = require('aws-sdk');
const FORM = require('../../config/helper/writeform');
const uuidv1 = require('uuid');

let docClient = new AWS.DynamoDB.DocumentClient();

function getAllStudents(res) {
    let params = {
        TableName: "Students"
    };
    let scanObject = {};
    docClient.scan(params, (err, data) => {
        if (err) {
            scanObject.err = err;
        } else {
            scanObject.data = data;
        }
        FORM.writeStudentTable(scanObject, res);
    });
}

function searchStudent(year, name, res) {
    let params = {
        TableName: 'Books'
    };
    let queryObject = {};
    console.log(year);
    console.log(name);
    if (year) {
        if (name) {
            params.KeyConditionExpression = '#y = :year and #n =:name';
            params.ExpressionAttributeNames = {
                '#y': 'year',
                '#n': 'name'
            };
            params.ExpressionAttributeValues = {
                ':year': Number(year),
                ':name': String(name)
            };
            docClient.query(params, (err, data) => {
                if (err) {
                    queryObject.err = err;
                } else {
                    queryObject.data = data;
                }
                FORM.writeStudentTable(queryObject, res);
            });
        } else {
            params.FilterExpression = '#y = :year';
            params.ExpressionAttributeNames = { '#y': 'year' };
            params.ExpressionAttributeValues = { ':year': Number(year) };
            docClient.scan(params, (err, data) => {
                if (err) {
                    queryObject.err = err;
                } else {
                    queryObject.data = data;
                }
                FORM.writeStudentTable(queryObject, res);
            });
        }
    } else if (!year) {
        if (name) {
            params.FilterExpression = '#n = :name';
            params.ExpressionAttributeNames = { '#n': 'name' };
            params.ExpressionAttributeValues = { ':name': String(name) };
            docClient.scan(params, (err, data) => {
                if (err) {
                    queryObject.err = err;
                } else {
                    queryObject.data = data;
                }
                FORM.writeStudentTable(queryObject, res);
            });
        }
    }
}


function createStudent(id_student, name_student, year, id_class, avata) {
    idGeneratorStudents = uuidv1.v1();
    let params = {
        TableName: 'Students',
        Item: {
            idGeneratorStudents: idGeneratorStudents,
            id_student: String(id_student),
            name_student: String(name_student),
            year: Number(year),
            id_class: String(id_class),
            avata: String(avata)
        }
    };
    docClient.put(params, (err, data) => {
        if (err) {
            FORM.writeCreateForm(res);
            res.write('<h5 style="color:red;">Vui lòng nhập đủ các thuộc tính</h5>');
        } else {
            res.writeHead(302, { 'Location': '/' });
        }
        res.end();
    });
}

function updateStudent(id_student, name_student, year, id_class, avata, res) {
    let paramsStudent = {
        TableName: 'Students',
        Key: {
            "id_student": String(id_student),
            "year": Number(year)
        },
        UpdateExpression: "set #n = :name, #a = :avata",
        ExpressionAttributeNames: {
            '#n': 'name',
            '#a': 'avata'
        },
        ExpressionAttributeValues: {
            ':type': String(name_student),
            ':author': String(avata)
        },
        ReturnValues: "UPDATED_NEW"
    };

    let paramsClass = {
        TableName: 'Classes',
        Key: {
            "id_class": String(id_class),
        },

        ReturnValues: "UPDATED_NEW"
    }
    docClient.update(paramsStudent, (err, data) => {
        if (err) {
            FORM.writeEditForm(id_student, name_student, year, id_class, avata, res);
            res.write('<h5 style="color:red;">Vui lòng nhập đủ các thuộc tính</h5>');
        } else {
            res.writeHead(302, { 'Location': '/' });
        }
        res.end();
    })
    docClient.update(paramsClass, (err, data) => {
        if (err) {
            FORM.writeEditForm(id_student, name_student, year, id_class, avata, res);
            res.write('<h5 style="color:red;">Vui lòng nhập đủ các thuộc tính</h5>');
        } else {
            res.writeHead(302, { 'Location': '/' });
        }
        res.end();
    })
}

function deleteStudent(year, name, res) {
    let params = {
        TableName: 'Students',
        Key: {
            "name": String(name),
            "year": Number(year)
        }
    };

    docClient.delete(params, (err, data) => {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.writeHead(302, { 'Location': '/' });
        }
        res.end();
    });
}

module.exports = {
    getAllStudents: getAllStudents,
    createStudent: createStudent,
    updateStudent: updateStudent,
    deleteStudent: deleteStudent
};