const express = require('express');

const app = express();

const { Client } = require('pg')

const path = require('path')

const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', 'views');

// const employeeRoutes = require('./routes/employee');
// const deaprtRoutes = require('./routes/department');

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
    client.query("create table IF NOT EXISTS department(dept_id serial primary key,dept_name text unique not null)").then(result => {
        console.log("depart table created");
    }).catch(err => {
        console.log(err);
    })
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
    client.query("create table IF NOT EXISTS employee(id serial primary key,emp_name text unique not null,emp_age integer not null,dept_id serial not null,dept_name text not null)").then(result => {
        console.log("depart table created");
    }).catch(err => {
        console.log(err);
    })
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

// app.use('/employee', employeeRoutes);

// app.use(deaprtRoutes);

app.use('/', (req, res, next) => {
    res.render('index.ejs', {
        docType: 'Welcome',
        path: ' '
    })
})


const client = new Client({
    connectionString: 'postgres://cslvhlglovazny:18d98c2070eabd8432140cdf43a227aed6b0f6a52af9e1472874f691248f7be6@ec2-3-237-55-96.compute-1.amazonaws.com:5432/d7er7fkp5m5ds5',
    ssl: {
        rejectUnauthorized: false
    }
});
client.connect().then(res => {
    console.log("Connnected successfully");
    app.listen(4000);
}).catch(err => {
    console.log(err);
})