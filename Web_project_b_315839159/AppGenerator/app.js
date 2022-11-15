const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require ('body-parser');
const db = require('../db/db');
const port =3000;
const crud = require('./crud');
const { Router, response, application } = require('express');





app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'pug');

app.use(express.static('public'));

const main=function(req,res){
  res.render('CarKing_Home_Page');
};
app.get('/',[main]);

app.get('/signUp',(req,res)=>{
  res.render('Sign_Up');
});
app.get('/signIn',(req,res)=>{
  res.render('Sign_In');
});
app.get('/parkingLots',(req,res)=>{
  res.render('Parking_Lots_New');
});
app.get('/homePage',(req,res)=>{
  res.render('CarKing_Home_page');
});



app.post('/newUser',  crud.Sign_Up);
app.post('/parkinglots',  [crud.Sign_In, crud.getTable]);

app.listen(port , () =>{
  console.log("Server running on port :"+port);
});

;


