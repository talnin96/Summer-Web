const mysql = require('mysql2');
const dbConfig = require('./dbConfig');
const path = require('path');
const csv = require('csvtojson');
// create connection
var con = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});
//open the connection

con.connect( error =>{
    if (error) throw error;
    console.log("successfuly conected to DB");
});
con.connect(function(err) {
    if (err) throw err;
    var sql3 = "DROP TABLE IF EXISTS Users";
    con.query(sql3, function (err) {
      if (err) throw err;
      console.log({message: "droped table user"});
    });
});



con.connect(function(err) {
    if (err) throw err;
    var sql4 = "DROP TABLE IF EXISTS data";
    con.query(sql4, function (err) {
        if (err) throw err;
        console.log({message: "droped table data"});
        });
});

con.connect(function(err) {
    if (err) throw err;
    var sql1 ="CREATE TABLE data (Name varchar(255) , Address VARCHAR(255), Cost int(3), dataLat float(13,11), dataLng float(13,11), Localized varchar (255))"
    con.query(sql1, function (err) {
            if (err) throw err;
            else
            console.log({message: "created table user"});
    });
    
   
      
});

con.connect(function(err) {
    var sql2 = "CREATE TABLE Users (Email varchar(255) NOT NULL PRIMARY KEY, firstName varchar(255), lastName varchar(255), passWord VARCHAR(255))";
    
    con.query(sql2, function (err, result) {
            if (err) throw err;
            else
            console.log({message: "created table user"});
    });
});



con.connect(function(err) {
    var sql5 = "INSERT INTO data SET ?";
    const csvDataFile= path.join(__dirname, "data.csv");
    csv()
    .fromFile(csvDataFile)
    .then((jsonObj)=>{
    jsonObj.forEach(element => {
        var NewEntry = {
            "Name": element.Name,
            "Address": element.Address,
            "Cost":element.Cost,
            "dataLat": element.dataLat,
            "dataLng": element.dataLng,
            "Localized": element.Localized
      
        }
        con.query(sql5, NewEntry, (err)=>{
            if (err) {
                console.log("error in inserting new parking lot", err);
                return;
            }
            else
            console.log({message: "insert into table data"});
            
         
        });
    });
   
    })
    
});

con.connect(function(err) {
    var sql6 = "INSERT INTO Users SET ?";
    const csvUserFile= path.join(__dirname, "Users.csv");
    csv()
    .fromFile(csvUserFile)
    .then((jsonObj)=>{
    jsonObj.forEach(element => {
        var NewEntry = {
            "firstName": element.firstName,
            "lastName": element.lastName,
            "Email":element.Email,
            "password": element.passWord
        }
        con.query(sql6, NewEntry, (err)=>{
            if (err) {
                console.log("error in inserting new user");
                return;
            }
            console.log({message: "insert into table user"});
           
            
        });
    });
    
    })
    
});



module.exports = con;