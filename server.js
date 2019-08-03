const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')

// Create connection
const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "password",
    database : `login`,
    port : 3306
});

const app = express();
app.use(cors());



app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

connection.connect((err)=>
{
    if(!err)
    console.log("Working DB");
    else
    console.log(err);
});

app.listen('3000', () => console.log(`app started on Port 3000`));

app.post('/updemail',(req,res) => {
    const email = req.body.email;
    const id = req.body.key;
    connection.query(`update user set email = "${email}" where userid = ${id}`,(err,rows,fields) =>
    {
        if(!err)
        res.send({status : "done update email"});
        else
        console.log(err);
    })
})

app.post('/updusername',(req,res) => {
    const username = req.body.username;
    const id = req.body.key;
    connection.query(`update user set username = "${username}" where userid = ${id}`,(err,rows,fields) =>
    {
        if(!err)
        res.send({status : "done update email"});
        else
        console.log(err)
    })
})

app.post('/delete',(req,res) =>{
    const email = req.body.email;
    connection.query(`delete from user where email = "${email}"`,(err,rows,fields) =>
    {
        console.log("delete called");
        console.log(err);
        if(err)
        {
            res.send({status : "error"});
        }
        else
        {
            res.send({status : "deleted"});
        }
    });
});

app.post('/create', (req,res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const type = req.body.type;
    console.log(req.body);
    connection.query(`insert into user(username,email,password,type) values ("${username}","${email}","${password}","${type}")`,
    (err,row,fields) =>
    {
        console.log("Create called");
        if(!err)
        {
            res.send({status : "done"});
        }
        else{
            console.log(err);
        }
    } )
})
app.post('/user', (req,res)=>{
    const user = req.body.user;
    const password = req.body.password;
    console.log(user);

    connection.query(`select * from user where email = "${user}" and password = "${password}"`, (err,rows,fields)=>
    {
        // console.log(fields);
        // console.log(rows);
        console.log(rows);

        if(!err)
        {

                res.send(rows);

        }
        else
        console.log(err);
    });
})


