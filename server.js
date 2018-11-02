const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const mysql = require('mysql');
const fs = require('fs');
const nodemailer = require("nodemailer");
const app = express();

const register = require('./endpoints/register');
const login = require('./endpoints/login');
const getStatus = require('./endpoints/getstatus');
const submitForm = require('./endpoints/submitform');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const con = mysql.createConnection({
  host: "sql12.freemysqlhosting.net",
  user: "sql12263778",
  password: "fHuXBCvcck",
  database: "sql12263778",
  port: "3306"
});
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "zk7676@gmail.com",
    pass: "shakir@12"
  }
});


cron.schedule("* * * * *", function() {
  con.query("select email from users where type='patient'",(error,result,field)=>{
    console.log(result.length);
    console.log(result);
    for(let i =0; i<result.length;i++){
      let mailOptions = {
        from: "zk7676@gmail.com",
        to: result[i].email,
        subject: `Regrding the Health Survey Form`,
        text: `Hi there, Please submit your Health Form as soon as possible.
        if you have submitted the form, please ignore this mail..
        Dr. Mahesh`
      };
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          throw error;
        } else {
          console.log("Email successfully sent!");
        }
      });
    }
  })
});

app.get('/',(req, res)=>{res.json('hello')});
app.post('/login',(req,res) => { login.handleLogin(req, res, con)});
app.post('/register',(req,res) => { register.handleRegister(req,res,con)});
app.post('/submitform',(req, res) => { submitForm.handleSubmitFrom(req, res, con)});
app.get('/getstatus',(req, res) => { getStatus.handleGetStatus(req, res, con)});
app.listen(3128);
