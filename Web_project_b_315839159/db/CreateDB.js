var SQL = require('./db');
const { callbackify } = require('util');
const { nextTick } = require('process');



const InsertParkingLot = (req,res,next)=>{
    var Q3 = "INSERT INTO data SET ?";
    const csvDataFile= path.join(__dirname, "data.csv");
    csv()
    .fromFile(csvDataFile)
    .then((jsonObj)=>{
    jsonObj.forEach(element => {
        var NewEntry = {
            "Name": element.NAme,
            "Address": element.Address,
            "Cost":element.Cost,
            "dataLat": element.dataLat,
            "dataLng": element.dataLng,
            "Localized": element.Localized
           
            
        }
        SQL.query(Q3, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting new parking lot", err);
                return;
            }
            else
            console.log({message: "insert into data"});
            return;
        });
    });
   
    })
    
};

const InsertUser = (req,res,next)=>{
    var Q4 = "INSERT INTO Users SET ?";
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
        SQL.query(Q4, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting new user", err);
                return;
            }
            else
            res.status(400).send({message: "insert into user"});
            return;
            
        });
    });
    
    })
    
};

module.exports = {
    //CreateParkingLot,
    //CreateUsers,
    InsertParkingLot,
    InsertUser,
    //DropTableUsers, 
    //DropTableParkingLot
 };

