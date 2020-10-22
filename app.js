const http = require('http');
const url = require('url');
const port = 3000;
const FORM = require('./config/helper/writeform');
const DATA = require('./api/controllers/student_controller');

http.createServer((req, res) => {
    let urlObject = url.parse(req.url, true);
    let pathName = urlObject.pathname;
    let data = urlObject.query;

    let id_student = data.id_student;
    let name_student = data.name_student;
    let year = data.year;
    let id_class = data.id_class;
    let avata = data.avata;


    if (pathName === '/') {
        FORM.writeSearchForm(res);
        DATA.getAllStudents(res);
    } else if (pathName === '/search') {
        if (!year && !name_student) {
            res.writeHead(302, { 'Location': '/' });
            res.end();
        } else {
            FORM.writeSearchForm(res);
            DATA.searchStudent(year, name_student, res);
        }
    } else if (pathName === '/new') {
        FORM.writeCreateForm(res);
        res.end();
    } else if (pathName === '/create') {
        DATA.createStudent(id_student, name_student, year, id_class, avata, res);
    } else if (pathName === '/edit') {
        FORM.writeEditForm(id_student, name_student, year, id_class, avata, res);
        res.end();
    } else if (pathName === '/save') {
        DATA.updateStudent(id_student, name_student, year, id_class, avata, res);
    } else if (pathName === '/delete') {
        DATA.deleteStudent(year, name_student, res);
    }
}).listen(port, () => {
    console.log(`Server starting at port ${port}`);
});