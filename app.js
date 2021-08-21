const express = require('express');

const app = express();

const { Client } = require('pg')

const path = require('path')

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/adddepart', (req, res) => {
    res.render('addDept.ejs', {
        docType: 'Add Department',
        path: 'depart/addDept'
    })
})
app.use('/postdepart', (req, res) => {
    const deptName = req.body.dept_name;
    client.query(`insert into department(dept_name) values('${deptName}')`).then(result => {
        console.log("inserted dept");
        res.redirect('/department');
    }).catch(err => {
        console.log(err);
    })
})

app.use('/department', (req, res) => {
    client.query("select * from department").then(result => {
        res.render('department.ejs', {
            docType: 'Departments',
            path: 'depart/Dept',
            Departments: result.rows
        })
    }).catch(err => {
        console.log(err);
    })
})

app.use('/addemploy', (req, res) => {
    client.query("select * from department").then(result => {
        res.render('addEmp.ejs', {
            docType: 'Add Employee',
            path: 'employee/addEmp',
            Departments: result.rows
        })
    }).catch(err => {
        console.log(err);
    })
})

app.use('/postemploy', (req, res) => {
    const EmpName = req.body.emp_name;
    const EmpAge = req.body.emp_age;
    const emp_dept = req.body.emp_dept;
    client.query(`select * from department where dept_name = '${emp_dept}'`).then(result => {
        const DeptId = result.rows[0].dept_id;
        const DeptName = result.rows[0].dept_name;
        client.query(`insert into employee(emp_name,emp_age,dept_id,dept_name) values('${EmpName}',${EmpAge},${DeptId},'${DeptName}')`).then(result => {
            console.log("inserted employee");
            res.redirect('/employee');
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
    })
});

app.use('/employee', (req, res) => {
    client.query("select * from employee").then(result => {
        res.render('employee.ejs', {
            docType: 'Employees',
            path: 'employee/Emp',
            Employees: result.rows
        })
    }).catch(err => {
        console.log(err);
    });
})

app.use('/editemployee', (req, res) => {
    const EmpId = req.body.empId;
    const EmpName = req.body.empName;
    const EmpAge = req.body.empAge;
    client.query("select * from department").then(result => {
        res.render('editemploy.ejs', {
            docType: 'Edit Employee',
            path: 'employee/Emp',
            empId: EmpId,
            empName: EmpName,
            empAge: EmpAge,
            Departments: result.rows
        })
    }).catch(err => {
        console.log(err);
    })
})

app.use('/postEditemploy', (req, res) => {
    const EmpName = req.body.emp_name;
    const EmpAge = req.body.emp_age;
    const emp_dept = req.body.emp_dept;
    const EmpId = req.body.empId;
    client.query(`select * from department where dept_name = '${emp_dept}'`).then(result => {
        const DeptId = result.rows[0].dept_id;
        const DeptName = result.rows[0].dept_name;
        client.query(`update employee set emp_name='${EmpName}',emp_age=${EmpAge},dept_name='${emp_dept}' where id=${EmpId}`).then(result => {
            console.log("Edited employee");
            res.redirect('/employee');
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
    })
});


app.use('/delEmp', (req, res, next) => {
    const EmpId = req.body.empId;
    client.query(`delete from employee where id = ${EmpId}`).then(result => {
        console.log("deleted");
        res.redirect('/employee');
    }).catch(err => {
        console.log(err);
    })
})

app.use('/delDept', (req, res, next) => {
    const DeptId = req.body.deptId;
    console.log(DeptId);
    client.query(`delete from department where dept_id = ${DeptId}`).then(result => {
        console.log("deleted");
        res.redirect('/department');
    }).catch(err => {
        console.log(err);
    })
})

app.use('/sortEmp', (req, res) => {
    client.query("select * from employee order by emp_name").then(result => {
        res.render('employee.ejs', {
            docType: 'Employees',
            path: 'employee/Emp',
            Employees: result.rows
        })
    }).catch(err => {
        console.log(err);
    });
})


app.use('/sortDept', (req, res) => {
    client.query("select * from department order by dept_name").then(result => {
        res.render('department.ejs', {
            docType: 'Departments',
            path: 'depart/Dept',
            Departments: result.rows
        })
    }).catch(err => {
        console.log(err);
    });
})


const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'traklabs',
    password: 'vignesh@26',
    port: 2000,
})
client.connect().then(res => {
    console.log("Connnected successfully");
    app.listen(4000);
}).catch(err => {
    console.log(err);
})