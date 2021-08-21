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


client.query("create table IF NOT EXISTS department(id serial unique,dept_name text)").then(res => {
    console.log("Created successfully");
}).catch(err => {
    console.log(err);
})

client.query("insert into department(dept_name) values('CSE')").then(res => {
    console.log("inserted dept");
}).catch(err => {
    console.log(err);
})