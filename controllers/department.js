exports.addDepart = (req, res) => {
    res.render('addDept.ejs', {
        docType: 'Add Department',
        path: 'depart/addDept'
    })
};


exports.postDepart = (req, res) => {
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
}

exports.department = (req, res) => {
    client.query("select * from department").then(result => {
        res.render('department.ejs', {
            docType: 'Departments',
            path: 'depart/Dept',
            Departments: result.rows
        })
    }).catch(err => {
        console.log(err);
    })
}

exports.delDepart = (req, res, next) => {
    const DeptId = req.body.deptId;
    console.log(DeptId);
    client.query(`delete from department where dept_id = ${DeptId}`).then(result => {
        console.log("deleted");
        res.redirect('/department');
    }).catch(err => {
        console.log(err);
    })
}

exports.sortDepart = (req, res) => {
    client.query("select * from department order by dept_name").then(result => {
        res.render('department.ejs', {
            docType: 'Departments',
            path: 'depart/Dept',
            Departments: result.rows
        })
    }).catch(err => {
        console.log(err);
    });
}