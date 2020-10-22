const path = require("path");
const fs = require('fs');

function writeSearchForm(res) {
    let data = fs.readFileSync(path.resolve(__dirname, "../../api/views/searchForm.html"), 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
}

function writeStudentTable(obj, res) {
    res.write('<table border="1px solid black"><tr><th>ID Student</th><th>Name Student</th><th>Year Birthday</th><th>Class</th><th>Avatar</th><th>Action</th></tr>');
    if (obj.err) {
        res.write(`<h5 style="color:red;">Error:: ${obj.err}</h5>`);
        res.write('<tr><td colspan="5">Nothing to show</td></tr>');
    } else {
        if (obj.data.Items.length === 0) {
            res.write('<tr><td colspan="5">Nothing to show</td></tr>');
        }
        obj.data.Items.forEach((student) => {
            res.write(`<tr><td>${student.id_student}</td><td>${student.name_student}</td>
      <td>${student.year}</td><td>${student.id_class}</td><td>${student.avata}</td>
      <td><a href="/edit?year=${student.id_student}&name=${student.name_student}&type=${student.year}&author=${student.id_class}&avata=${student.avata}">Edit</a>
      <a href="/delete?year=${student.year}&name=${student.name}">Delete</a></td></tr>`);
        });
    }
    res.write('</table>');
    res.end();
}

function writeCreateForm(res) {
    let data = fs.readFileSync(path.resolve(__dirname, "../../api/views/createForm.html"), 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
}

function writeEditForm(id_student, name_student, year, id_class, avata, res) {
    let data = fs.readFileSync(path.resolve(__dirname, "../../api/views/editForm.html"), 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    data = insertId(data, id_student);
    data = insertName(data, name_student);
    data = insertYear(data, year);
    data = insertClass(data, id_class);
    data = insertAvata(data, avata);
    res.write(data);
}

function insertId(data, id_student) {
    let strInputId = '<input name="id_student" type="text" readonly="readonly"/>';
    let indexId = data.indexOf(strInputId) + strInputId.length - 2;
    return data.substr(0, indexId) + ` value='${id_student}'` + data.substr(indexId);
}


function insertName(data, name_student) {
    let strInputName = '<input name="name_student" type="text" readonly="readonly"/>';
    let indexName = data.indexOf(strInputName) + strInputName.length - 2;
    return data.substr(0, indexName) + ` value='${name_student}'` + data.substr(indexName);
}

function insertYear(data, year) {
    let strInputYear = '<input name="year" type="text" readonly="readonly"/>';
    let indexYear = data.indexOf(strInputYear) + strInputYear.length - 2;
    return data.substr(0, indexYear) + ` value='${year}'` + data.substr(indexYear);
}


function insertClass(data, id_class) {
    let strInputClass = '<input name="id_class" type="text"/>';
    let indexClass = data.indexOf(strInputClass) + strInputClass.length - 2;
    return data.substr(0, indexClass) + ` value='${id_class}'` + data.substr(indexClass);
}

function insertAvata(data, avata) {
    let strInputAvata = '<input name="avata" type="text"/>';
    let indexAvata = data.indexOf(strInputAvata) + strInputAvata.length - 2;
    return data.substr(0, indexAvata) + ` value='${avata}'` + data.substr(indexAvata);
}


module.exports = {
    writeSearchForm: writeSearchForm,
    writeCreateForm: writeCreateForm,
    writeEditForm: writeEditForm,
    writeStudentTable: writeStudentTable
};