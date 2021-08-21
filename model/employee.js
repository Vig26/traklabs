const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'traklabs',
    password: 'vignesh@26',
    port: 2000,
})
client.connect().then(res => {
    console.log("Connnected successfully");
}).catch(err => {
    console.log(err);
})
client.query("select * from employee where emp_name = 'Vignesh S'").then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})
client.query("insert into employee(emp_name,emp_age) values('Sathish',15)").then(res => {
    console.log("inserted");
}).catch(err => {
    console.log(err);
})