const db=require('../config/db.js');

const deleteStudent = (req, res) => {
    const studentId = req.params.id;
    db.connect((err) => {
        if (err) {
            console.error('Error connecting to the database!', err);
            return res.status(500).json({
                "success": false,
                "message": 'Error connecting to the database!',
            });
        } else {
            db.query('DELETE FROM students WHERE id = ?', [studentId], (err, results) => {
                if (err) {
                    console.error('Error executing query!', err);
                    return res.status(500).json({
                        "success": false,
                        "message": 'Error executing query!',
                    });
                }
                if (results.affectedRows === 0) {
                    return res.status(404).json({
                        "success": false,
                        "message": 'Student not found!',
                    });
                }
                return res.status(200).json({
                    "success": true,
                    "message": 'Student deleted successfully!',
                });
            });
        }
    });
};

const getAllStudents = (req, res) => {
    db.connect((err) => {
        if (err) {
            return res.status(500).json({
                "success": false,
                "message": 'Error connecting to the database!',
            });
        } else {
            db.query('SELECT * FROM students order by id  desc limit 10 ', (err, results) => {
                if (err) {
                    return res.status(500).json({
                        "success": false,
                        "message": 'Error executing query!',
                    });
                } else {
                    console.log(results);
                    return res.status(200).json({
                        "success": true,
                        "message": 'Students retrieved successfully!',
                        "data": results
                    });
                }
            });
        }
    });

};

const getStudentById = (req, res) => {
    const studentId = req.params.id;
    if (!studentId) {

        return res.status(400).json({
            "success": false,
            "message": 'Student ID is required',
        });
    }
    db.connect((err) => {
        if (err) {
            return res.status(500).json({
                "success": false,
                "message": 'Error connecting to the database!',
            });
        } else {
            db.query('SELECT * FROM students WHERE id = ?', [studentId], (err, results) => {
                if (err) {
                    return res.status(500).json({
                        "success": false,
                        "message": 'Error executing query!',
                    });
                }
                else if (results.length === 0) {
                    return res.status(404).json({
                        "success": false,
                        "message": 'Student not found!',
                    });
                }
                else {
                    console.log(results);
                    return res.status(200).json({
                        "success": true,
                        "message": 'Student retrieved successfully!',
                        "data": results[0]
                    });
                }
            });
        }
    });
};

const createStudent = (req, res) => {
    res.render('student/create', { title: 'Student Create Page', message: 'Welcome to the student create page!' })
};

const addStudent = (req, res) => {
    // res.send('Received data: ' + JSON.stringify(req.body));
    const { admission_number, first_name, last_name, gender, date_of_birth, nic_number, birth_certificate_number, tele_number, house_id, grade_id, medium, date_of_admission, per_address, family_id } = req.body;

    // res.send(`Received data: Admission Number - ${admission_no}, First Name - ${first_name}, Last Name - ${last_name}`);
    if (!admission_number || !first_name || !last_name) {
        return res.status(400).json({
            "success": false,
            "message": 'All fields are required',
        });
    }
    db.connect((err) => {
        if (err) {
            return res.status(500).json({
                "success": false,
                "message": 'Error connecting to the database!',
            });
        } else {

            db.query('INSERT INTO students ( admission_number, first_name, last_name,gender, date_of_birth, nic_number, birth_certificate_number, tele_number, house_id, grade_id, medium, date_of_admission, per_address, family_id ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [admission_number, first_name, last_name, gender, date_of_birth, nic_number, birth_certificate_number, tele_number, house_id, grade_id, medium, date_of_admission, per_address, family_id], (err, results) => {
                if (err) {
                    return res.status(500).json({
                        "success": false,
                        "message": 'Error executing query!',
                    });
                } else {
                    return res.status(201).json({
                        "success": true,
                        "message": 'Student added successfully!',
                        "data": results[0]
                    });
                }
            });
        }
    })
};

const updateStudent = (req, res) => {
    const studentId = req.params.id;
    const { admission_number, first_name, last_name, gender, date_of_birth, nic_number, birth_certificate_number, tele_number, house_id, grade_id, medium, date_of_admission, per_address, family_id } = req.body;

    if (!admission_number || !first_name || !last_name) {
        return res.status(400).json({
            "success": false,
            "message": 'All fields are required',
        });
    }

    db.connect((err) => {
        if (err) {
            return res.status(500).json({
                "success": false,
                "message": 'Error connecting to the database!',
            });
        } else {
            db.query('UPDATE students SET admission_number = ?, first_name = ?, last_name = ?, gender = ?, date_of_birth = ?, nic_number = ?, birth_certificate_number = ?, tele_number = ?, house_id = ?, grade_id = ?, medium = ?, date_of_admission = ?, per_address = ?, family_id = ? WHERE id = ?', [admission_number, first_name, last_name, gender, date_of_birth, nic_number, birth_certificate_number, tele_number, house_id, grade_id, medium, date_of_admission, per_address, family_id, studentId], (err, results) => {
                if (err) {
                    return res.status(500).json({
                        "success": false,
                        "message": 'Error executing query!',
                    });
                } else {
                    return res.status(200).json({
                        "success": true,
                        "message": 'Student updated successfully!',
                    });
                }
            });
        }
    })
};



module.exports = {
    deleteStudent,
    updateStudent,
    getAllStudents,
    getStudentById,
    createStudent,
    addStudent
};
