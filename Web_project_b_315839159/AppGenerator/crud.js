var path = require('path');
const { FORMERR } = require('dns'); 
const exp = require('constants');
const sql = require('../db/db');
const { nextTick } = require('process');




const Sign_In = (req, res, next)=>{
    var existUser = req.body.email;
    var password = req.body.password;
    sql.query("SELECT * FROM Users where (Email =? AND password =?)" , [existUser,password] , (err)=>{
            if (err) {
                console.log("ERROR IS: " + err);
                res.status(400).send("Somthing is wrong with query" + err);
                return;
            }
            next();
            // res.render('Parking_Lots_New');
            // return;
    } );
};


const Sign_Up = (req,res)=>{
    const email=req.body.email;
    var signUser = {
       
        "Firstname":req.body.firstName,
        "LastName":req.body.lastName,
        "Email": req.body.email,
        "password": req.body.password     
     
    };
    sql.query("SELECT * FROM Users where (Email =?)" , [email] , (err)=>{
        if (err) {
            sql.query("INSERT INTO Users SET ?", [signUser], (err)=>{
                if (err) {
                    console.log("error: ", err);
                    res.status(400).render({message: "error in getting all Users: " + err});
                    return; 
                }
                res.render('Sign_In');
                return;
            });
        } 
        else{
        res.render('Sign_Up');
        return;
        
        }
    });
    
   
    
    
};

const getTable =(req,res)=>{
    const lngPage=req.body.lng;
    const latPage=req.body.lat;
    const sql7 = "SELECT *,ROUND(3956 * 2 * ASIN(SQRT( POWER(SIN((? - abs(data.dataLat)) * pi()/180 / 2), 2) + COS(? * pi()/180 ) * COS(abs(data.dataLat) * pi()/180)  * POWER(SIN((data.dataLng - ?) * pi()/180 / 2), 2) )),3) AS Distance FROM data ORDER BY Distance";
sql.query(sql7 ,[latPage,lngPage,lngPage], (err, sqlres) =>{
    console.log(sqlres);
    if (err) {
        console.log("error in getting perkinglots table " + err);
        res.status(400).send({message:"error in getting perkinglots table " + err})
        return;
    }
    if(sqlres.length ==0){
        
        res.status(400).render('no matching results');
        return; 
    }
    else{ 
    res.render('Parking_Lots_New', {  spf : sqlres });
    return;
    }
});

};




module.exports = {Sign_In, Sign_Up, getTable};