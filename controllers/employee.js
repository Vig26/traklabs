const { Client } = require('pg')

const client = new Client({
    connectionString: 'postgres://cslvhlglovazny:18d98c2070eabd8432140cdf43a227aed6b0f6a52af9e1472874f691248f7be6@ec2-3-237-55-96.compute-1.amazonaws.com:5432/d7er7fkp5m5ds5',
    ssl: {
        rejectUnauthorized: false
    }
});


exports.addEmploy = (req, res) => {
    client.query("select * from department").then(result => {
        res.render('addEmp.ejs', {
            docType: 'Add Employee',
            path: 'employee/addEmp',
            Departments: result.rows
        })
    }).catch(err => {
        console.log(err);
    })
}

exports.postEmploy = (req, res) => {
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
}

exports.emplpoyee = (req, res) => {
    client.query("select * from employee").then(result => {
        res.render('employee.ejs', {
            docType: 'Employees',
            path: 'employee/Emp',
            Employees: result.rows
        })
    }).catch(err => {
        console.log(err);
    });
}

exports.editEmployee = (req, res) => {
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
}

exports.postEditEmploy = (req, res) => {
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
}


exports.delEmploy = (req, res, next) => {
    const EmpId = req.body.empId;
    client.query(`delete from employee where id = ${EmpId}`).then(result => {
        console.log("deleted");
        res.redirect('/employee');
    }).catch(err => {
        console.log(err);
    })
}

exports.sortEmploy = (req, res) => {
    client.query("select * from employee order by emp_name").then(result => {
        res.render('employee.ejs', {
            docType: 'Employees',
            path: 'employee/Emp',
            Employees: result.rows
        })
    }).catch(err => {
        console.log(err);
    });
}