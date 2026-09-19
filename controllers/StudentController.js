// const db = require('../config/db.js');

// const deleteStudent = (req, res) => {
//     const studentId = req.params.id;
//     console.log(`Deleting student with ID: ${studentId}`);
//     db.connect((err) => {
//         if (err) {
//             res.send('Error connecting to the database!');
//         } else {
//             db.query('DELETE FROM students WHERE id = ?', [studentId], (err, results) => {
//                 if (err) {
//                     res.send('Error executing query!' + err);
//                 } else {
//                     res.redirect('/student');
//                 }
//             })
//         }
//     })
// };

// const getAllStudents = (req, res) => {
//     db.connect((err) => {
//         if (err) {
//             res.send('Error connecting to the database!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
//         } else {
//             db.query('SELECT * FROM students order by id  desc limit 10 ', (err, results) => {
//                 if (err) {
//                     res.send('Error executing query!');
//                 } else {
//                     console.log(results);
//                     res.render('student/index', { title: 'Student Page', message: 'Welcome to the student page!', students: results });
//                 }
//             })
//         }
//     })
// };


// const getStudentById = (req, res) => {
//     const studentId = req.params.id;
//     if (!studentId) {
//         res.status(400).send('Student ID is required');
//         return;
//     }
//     db.connect((err) => {
//         if (err) {
//             res.send('Error connecting to the database!');
//         } else {
//             db.query('SELECT * FROM students WHERE id = ?', [studentId], (err, results) => {
//                 if (err) {
//                     res.send('Error executing query!');
//                 }
//                 else if (results.length === 0) {
//                     res.status(404).render('student/not_found', { title: 'Student not found', message: 'The requested student was not found.' });
//                 }
//                 else {
//                     console.log(results);
//                     res.render('student/show', { title: 'Student show Page', message: `Welcome to the student page for student ID: ${studentId}`, student: results[0] });
//                 }
//             })
//         }
//     })
// };


// const editStudent = (req, res) => {
//     const studentId = req.params.id;
//     if (!studentId) {
//         res.status(400).send('Student ID is required');
//         return;
//     }
//     db.connect((err) => {
//         if (err) {
//             res.send('Error connecting to the database!');
//         } else {
//             db.query('SELECT * FROM students WHERE id = ?', [studentId], (err, results) => {
//                 if (err) {
//                     res.send('Error executing query!');
//                 } else if (results.length === 0) {
//                     res.status(404).render('student/not_found', { title: 'Student not found', message: 'The requested student was not found.' });
//                 } else {
//                     res.render('student/edit', { title: 'Edit Student Page' + "-" + results[0].last_name, student: results[0] });
//                 }
//             });
//         }
//     })
// };

// const updateStudent = (req, res) => {
//     const studentId = req.params.id;
//     const { admission_number, first_name, last_name, gender, date_of_birth, nic_number, birth_certificate_number, tele_number, house_id, grade_id, medium, date_of_admission, per_address, family_id } = req.body;

//     if (!admission_number || !first_name || !last_name) {
//         res.status(400).send('All fields are required');
//         return;
//     }

//     db.connect((err) => {
//         if (err) {
//             res.send('Error connecting to the database!!!!!!!!!!!!!!!!!!');
//         } else {
//             db.query('UPDATE students SET admission_number = ?, first_name = ?, last_name = ?, gender = ?, date_of_birth = ?, nic_number = ?, birth_certificate_number = ?, tele_number = ?, house_id = ?, grade_id = ?, medium = ?, date_of_admission = ?, per_address = ?, family_id = ? WHERE id = ?', [admission_number, first_name, last_name, gender, date_of_birth, nic_number, birth_certificate_number, tele_number, house_id, grade_id, medium, date_of_admission, per_address, family_id, studentId], (err, results) => {
//                 if (err) {
//                     res.send('Error executing query!' + err);
//                 } else {
//                     res.redirect('/student');
//                 }
//             });
//         }
//     })
// };


// const createStudent = (req, res) => {
//     res.render('student/create', { title: 'Student Create Page', message: 'Welcome to the student create page!' }) };

// const addStudent = (req, res) => {
//     // res.send('Received data: ' + JSON.stringify(req.body));
//     const { admission_number, first_name, last_name, gender, date_of_birth, nic_number, birth_certificate_number, tele_number, house_id, grade_id, medium, date_of_admission, per_address, family_id } = req.body;

//     // res.send(`Received data: Admission Number - ${admission_no}, First Name - ${first_name}, Last Name - ${last_name}`);
//     if (!admission_number || !first_name || !last_name) {
//         res.status(400).send('All fields are required');
//         return;
//     }
//     db.connect((err) => {
//         if (err) {
//             res.send('Error connecting to the database!');
//         } else {

//             db.query('INSERT INTO students ( admission_number, first_name, last_name,gender, date_of_birth, nic_number, birth_certificate_number, tele_number, house_id, grade_id, medium, date_of_admission, per_address, family_id ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [admission_number, first_name, last_name, gender, date_of_birth, nic_number, birth_certificate_number, tele_number, house_id, grade_id, medium, date_of_admission, per_address, family_id], (err, results) => {
//                 if (err) {
//                     console.error(err);
//                     return res.send(err.sqlMessage);
//                 } else {
//                     res.redirect('/student');
//                 }
//             });
//         }
//     })
// };

// module.exports = {
//     deleteStudent,
//     getAllStudents,
//     getStudentById,
//     editStudent,
//     updateStudent,
//     createStudent,
//     addStudent
// };

//- async/await implementation -----------------------


const db = require('../config/db.js');


// ===============================
// DELETE STUDENT
// ===============================
const deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;

        console.log(`Deleting student with ID: ${ studentId } `);

        const [results] = await db.query(
            'DELETE FROM students WHERE id = ?',
            [studentId]
        );

        res.redirect('/student');

    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting student!');
    }
};


// ===============================
// GET ALL STUDENTS
// ===============================
const getAllStudents = async (req, res) => {
    try {

        const [results] = await db.query(
            'SELECT * FROM students ORDER BY id DESC LIMIT 10'
        );

        console.log(results);

        res.render('student/index', {
            title: 'Student Page',
            message: 'Welcome to the student page!',
            students: results
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Error getting students!');
    }
};


// ===============================
// GET STUDENT BY ID
// ===============================
const getStudentById = async (req, res) => {

    try {

        const studentId = req.params.id;

        if (!studentId) {
            return res.status(400).send('Student ID is required');
        }

        const [results] = await db.query(
            'SELECT * FROM students WHERE id = ?',
            [studentId]
        );

        if (results.length === 0) {
            return res.status(404).render('student/not_found', {
                title: 'Student not found',
                message: 'The requested student was not found.'
            });
        }

        console.log(results);

        res.render('student/show', {
            title: 'Student Show Page',
            message: `Welcome to the student page for student ID: ${ studentId } `,
            student: results[0]
        });

    } catch (err) {

        console.error(err);
        res.status(500).send('Error getting student!');

    }
};


// ===============================
// EDIT STUDENT
// ===============================
const editStudent = async (req, res) => {

    try {

        const studentId = req.params.id;

        if (!studentId) {
            return res.status(400).send('Student ID is required');
        }

        const [results] = await db.query(
            'SELECT * FROM students WHERE id = ?',
            [studentId]
        );

        if (results.length === 0) {
            return res.status(404).render('student/not_found', {
                title: 'Student not found',
                message: 'The requested student was not found.'
            });
        }

        res.render('student/edit', {
            title: 'Edit Student Page - ' + results[0].last_name,
            student: results[0]
        });

    } catch (err) {

        console.error(err);
        res.status(500).send('Error getting student for editing!');

    }
};


// ===============================
// UPDATE STUDENT
// ===============================
const updateStudent = async (req, res) => {

    try {

        const studentId = req.params.id;

        const {
            admission_number,
            first_name,
            last_name,
            gender,
            date_of_birth,
            nic_number,
            birth_certificate_number,
            tele_number,
            house_id,
            grade_id,
            medium,
            date_of_admission,
            per_address,
            family_id
        } = req.body;


        if (!admission_number || !first_name || !last_name) {
            return res.status(400).send('All fields are required');
        }


        await db.query(
            `UPDATE students SET
admission_number = ?,
    first_name = ?,
    last_name = ?,
    gender = ?,
    date_of_birth = ?,
    nic_number = ?,
    birth_certificate_number = ?,
    tele_number = ?,
    house_id = ?,
    grade_id = ?,
    medium = ?,
    date_of_admission = ?,
    per_address = ?,
    family_id = ?
        WHERE id = ? `,
            [
                admission_number,
                first_name,
                last_name,
                gender,
                date_of_birth,
                nic_number,
                birth_certificate_number,
                tele_number,
                house_id,
                grade_id,
                medium,
                date_of_admission,
                per_address,
                family_id,
                studentId
            ]
        );

        res.redirect('/student');

    } catch (err) {

        console.error(err);
        res.status(500).send('Error updating student!');

    }
};


// ===============================
// SHOW CREATE STUDENT PAGE
// ===============================
const createStudent = (req, res) => {

    res.render('student/create', {
        title: 'Student Create Page',
        message: 'Welcome to the student create page!'
    });

};


// ===============================
// ADD STUDENT
// ===============================
const addStudent = async (req, res) => {

    try {

        const {
            admission_number,
            first_name,
            last_name,
            gender,
            date_of_birth,
            nic_number,
            birth_certificate_number,
            tele_number,
            house_id,
            grade_id,
            medium,
            date_of_admission,
            per_address,
            family_id
        } = req.body;


        if (!admission_number || !first_name || !last_name) {
            return res.status(400).send('All fields are required');
        }


        await db.query(
            `INSERT INTO students
    (
        admission_number,
        first_name,
        last_name,
        gender,
        date_of_birth,
        nic_number,
        birth_certificate_number,
        tele_number,
        house_id,
        grade_id,
        medium,
        date_of_admission,
        per_address,
        family_id
    )
VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                admission_number,
                first_name,
                last_name,
                gender,
                date_of_birth,
                nic_number,
                birth_certificate_number,
                tele_number,
                house_id,
                grade_id,
                medium,
                date_of_admission,
                per_address,
                family_id
            ]
        );

        res.redirect('/student');

    } catch (err) {

        console.error(err);
        res.status(500).send('Error adding student!');

    }
};


// ===============================
// EXPORT CONTROLLERS
// ===============================
module.exports = {
    deleteStudent,
    getAllStudents,
    getStudentById,
    editStudent,
    updateStudent,
    createStudent,
    addStudent
};

