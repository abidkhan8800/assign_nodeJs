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
  host: "localhost",
  user: "root",
  password: "",
  database: "maheshclinic",
  port: "3306"
});
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mail@gmail.com",
    pass: "password"
  }
});

//to check the mailer please replace friday with *,then mailer will mail in every minute.
cron.schedule("* * * * friday", function() {
  con.query("select email from users where type='patient'",(error,result,field)=>{
    if(error) throw error;
    console.log(result.length);
    console.log(result);
    for(let i =0; i<result.length;i++){
      let mailOptions = {
        from: "mail@gmail.com",
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
// { use these credntials test the login
// 	"email": "mahesh@gmail.com",
// 	"password": "mahesh@123"
// }
app.post('/register',(req,res) => { register.handleRegister(req,res,con)});
// { you can resgister with your credentials
// 	"email": "ann@gmail.com",
// 	"password": "bananas",
// 	"name": "ann",
// 	"type": "patient"
// }
app.post('/submitform',(req, res) => { submitForm.handleSubmitFrom(req, res, con)});
// {submit the form
// 	"name": "rishi",
// 	"email": "rishi@gmail.com",
// 	"status": "yes",
// 	"uid": "3"
// }

app.get('/getstatus',(req, res) => { getStatus.handleGetStatus(req, res, con)});
// to get list of people who have not submitted their survey from use this route

app.listen(3128);
