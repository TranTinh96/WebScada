var Getway = require("../models/home/project.model");
var Configuration =require("../models/home/modbus/configuration.model");
var tagSerial= require("../models/home/modbus/mode.modbus/mode_serial");
var tagTCP= require("../models/home/modbus/mode.modbus/mode_tcp");


module.exports.home = function (req, res, next) {
     res.render("home/home");
}

/*-------------------------------------------------Project------------------------------------------------*/
module.exports.project = function (req, res, next) {
     res.render("home/home-project");
}
module.exports.postProject= function(req,res,next){
     res.redirect("/home/project");
  }
  
/*--------------------------------------------------Modbus------------------------------------------------*/
module.exports.getModbus= async function(req,res,next){
   var ModbusCOM= await Configuration.find();
   /*------------------------------Tag Serial----------------------------*/
   var readC_S       = await tagSerial.find({type:"readCoils"}).sort({"address":1});
   var readIn_S      = await tagSerial.find({type:"readDiscreteInputs"}).sort({"address":1});
   var readHReg_S    = await tagSerial.find({type:"readHoldingRegisters"}).sort({"address":1});
   var readInReg_S   = await tagSerial.find({type:"readInputRegisters"}).sort({"address":1});
   var writeC_S      = await tagSerial.find({type:"writeCoil"}).sort({"address":1});
   var writeReg_S    = await tagSerial.find({type:"writeRegisters"}).sort({"address":1});
  /*------------------------------Tag TCP--------------------------------*/
   var readC_T       = await tagTCP.find({type:"readCoils"}).sort({"address":1});
   var readIn_T      = await tagTCP.find({type:"readDiscreteInputs"}).sort({"address":1});
   var readHReg_T    = await tagTCP.find({type:"readHoldingRegisters"}).sort({"address":1});
   var readInReg_T   = await tagTCP.find({type:"readInputRegisters"}).sort({"address":1});
   var writeC_T      = await tagTCP.find({type:"writeCoil"}).sort({"address":1});
   var writeReg_T    = await tagTCP.find({type:"writeRegisters"}).sort({"address":1});

   res.render('home/home-modbus',{
       ComTCP    :   ModbusCOM,
       /*----------------Serial--------------*/
       readC_S      :   readC_S,
       readIn_S     :   readIn_S,
       readHReg_S   :   readHReg_S,
       readInReg_S  :   readInReg_S,
       writeC_S     :   writeC_S,
       writeReg_S   :   writeReg_S,
      /*----------------Serial--------------*/
       readC_T      :   readC_T,
       readIn_T     :   readIn_T,
       readHReg_T   :   readHReg_T,
       readInReg_T  :   readInReg_T,
       writeC_T     :   writeC_T,
       writeReg_T   :   writeReg_T

   });
   
}
module.exports.postModbus= function(req,res,next){
     res.redirect("/home/modbus");
  }
  
module.exports.Delete= function(req,res,next){
    
     res.redirect("/home/modbus");
 }

 module.exports.Remove= function(req,res,next){
    
     res.redirect("/home/modbus");
 }
