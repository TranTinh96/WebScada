var Getway = require("../models/home/project.model");
var Configuration =require("../models/home/modbus/configuration.model");
var Serial =require("../models/home/modbus/serial.model");
var TCP =require("../models/home/modbus/tcp.model");
var tagSerial =require("../models/home/modbus/mode.modbus/mode_serial");
var tagTCP =require("../models/home/modbus/mode.modbus/mode_tcp");

var tag_serial=[],tag_tcp=[];
var slaID,device;
/*-----------------------Home-Project-------------------*/

module.exports.Project=function(req,res,next)
 {
     var newGetway    = new Getway(); 
     newGetway.Project= req.body;
     newGetway.save(function(err) 
     {
           if (err)throw err;
     });  
     next();         
 }

/*-----------------------Home-Modbus-------------------*/
module.exports.Modbus= function(req,res,next)
{   
    var newConfiguration=Configuration();
    var  serialtcp =req.body.serialtcp ;

    if(serialtcp=="Serial")
    {    newConfiguration.name="Serial"
         newConfiguration.modbusCOM= req.body;
         newConfiguration.save(function(err) 
        {
          if (err)throw err;
        });
    }else if(serialtcp=="TCP") {
        newConfiguration.name="tcp"
        newConfiguration.modbusTCP= req.body;
        newConfiguration.save(function(err) 
       {
         if (err)throw err;
       });
    };
      
    next();             
}

module.exports.Remove= async function(req,res,next){
    var id = req.params.id;
    var ComTCP= await Configuration.remove({_id :id});
    next();   
}
//Update Serial
module.exports.UpdateSerial= async function(req,res,next){
  var id = req.params.id;
  var name=req.body.name;
  var tag_serial= await tagSerial.findOneAndUpdate({"_id":id},{"name":name}); 
}
//Update TCP/IP
module.exports.UpdateTCP= async function(req,res,next){
  var id = req.params.id;
  var name=req.body.name;
  var tag_tcp= await tagTCP.findOneAndUpdate({"_id":id},{"name":name});  
}
//Delete Serial
module.exports.DeleteSerial=async function(req,res,next){
 
  var FC = req.params.id;
  var FC_Delete=await tagSerial.remove({"type":FC});  
  console.log(FC)
  switch(FC){
    case "readCoils":
        var FC1= await Serial.remove({"name":FC});
    break;
     case "readDiscreteInputs":
        var FC2= await Serial.remove({"name":FC});
    break;
     case "readHoldingRegisters":
        var FC3= await Serial.remove({"name":FC});
    break;
     case "readInputRegisters":
        var FC4= await Serial.remove({"name":FC});
    break;
    case "writeCoil":
        var FC15= await Serial.remove({"name":FC});
    break;
    case "writeRegisters":
        var FC16= await Serial.remove({"name":FC});
    break;
  }
}
//Delete TCP
module.exports.DeleteTCP=async function(req,res,next){
 
  var FC = req.params.id;
  var FC_Delete=await tagTCP.remove({"type":FC});  
  console.log(FC)
  switch(FC){
    case "readCoils":
        var FC1= await TCP.remove({"name":FC});
    break;
     case "readDiscreteInputs":
        var FC2= await TCP.remove({"name":FC});
    break;
     case "readHoldingRegisters":
        var FC3= await TCP.remove({"name":FC});
    break;
     case "readInputRegisters":
        var FC4= await TCP.remove({"name":FC});
    break;
    case "writeCoil":
        var FC15= await TCP.remove({"name":FC});
    break;
    case "writeRegisters":
        var FC16= await TCP.remove({"name":FC});
    break;
  }
}





/*-----------------------Home-Projet-Table-------------------*/
module.exports.Serial=async function(req,res,next){

  var newSerial= new Serial();
  var newTCP= new TCP();

  var ModbusCOM= await Configuration.find();

      var mode=req.body.modeModbus;
      var typeModbus=req.body.typeModbus;
      var name=req.body.nameModbus;
      var startAddress =req.body.startAddress;
      var length=req.body.length;
      var dataType=req.body.dataType;

      for(var i of ModbusCOM){
        if(i.modbusCOM.serialtcp==mode){
          slaID=i.modbusCOM.slaveID;
          device=i.modbusCOM.devicename;
        }
        else if(i.modbusTCP.serialtcp==mode){
          slaID=i.modbusTCP.slaveID;
          device=i.modbusTCP.devicename;
        }
      }
     
      if( mode=="Serial")
      {
        switch(typeModbus) {
          case "readCoils":{
             newSerial.name= "readCoils";
             newSerial.readCoils=req.body;
             newSerial.readCoils.slaveID=slaID;
             newSerial.readCoils.device=device;
             newSerial.save(function(err) 
             {
               if(err)throw err;
             });
             /*-------------Tag Auto--------------*/
            break;
          }
          case "readDiscreteInputs":{
            newSerial.name= "readDiscreteInputs";
            newSerial.readDiscreteInputs=req.body;
            newSerial.readDiscreteInputs.slaveID=slaID;
            newSerial.readDiscreteInputs.device=device;
            newSerial.save(function(err) 
            {
              if (err)throw err;
            });
           break;
           
          }
          case "readHoldingRegisters":{
            newSerial.name= "readHoldingRegisters";
            newSerial.readHoldingRegisters=req.body;
            newSerial.readHoldingRegisters.slaveID=slaID;
            newSerial.readHoldingRegisters.device=device;
            newSerial.save(function(err) 
            {
              if (err)throw err;
            });
            break;
          }
          case "readInputRegisters":{
            newSerial.name= "readInputRegisters";
            newSerial.readInputRegisters=req.body;
            newSerial.readInputRegisters.slaveID=slaID;
            newSerial.readInputRegisters.device=device;
            newSerial.save(function(err) 
            {
              if (err)throw err;
            });
            break;
          }
          case "writeCoil":{
            newSerial.name= "writeCoil";
            newSerial.writeCoil=req.body;
            newSerial.writeCoil.slaveID=slaID;
            newSerial.writeCoil.device=device;
            newSerial.save(function(err) 
            {
              if (err)throw err;
            });
            break;
          }
          case "WriteRegisters":{
            newSerial.name= "WriteRegisters";
            newSerial.WriteRegisters=req.body;
            newSerial.WriteRegisters.slaveID=slaID;
            newSerial.WriteRegisters.device=device;
            newSerial.save(function(err) 
            {
              if (err)throw err;
            });
            break;
          }
        }
        /*-------------------Tao so luong Tab--------------------*/
      
        for(var j=0;j<length;j++)
        {
          var a=parseInt(j)+ parseInt(startAddress);
          tag_serial.push(
            {
              name        : name+"("+ j +")",
              address     : a,
              device      : device,
              type        : typeModbus,
              dataType    : dataType,
              byteOrder   :  "Big Endian"
            }
          )
        }

        for (event of tag_serial) {
          var newTagSerial = new tagSerial(event);
          newTagSerial.save(function(err){
            if (err) throw err;
          });
        }       
        tag_serial.splice(0);
      /*---------------------------END-------------------------------*/
      }else if(mode="TCP")
      {
        switch(typeModbus) {
          case "readCoils":{
             newTCP.name="readCoils";
             newTCP.readCoils=req.body;
             newTCP.readCoils.slaveID=slaID;
             newTCP.readCoils.device=device;
             newTCP.save(function(err) 
             {
               if (err)throw err;
             });
            break;
          }
          case "readDiscreteInputs":{
            newTCP.name="readDiscreteInputs";
            newTCP.readDiscreteInputs=req.body;
            newTCP.readDiscreteInputs.slaveID=slaID;
            newTCP.readDiscreteInputs.device=device;
            newTCP.save(function(err) 
            {
              if (err)throw err;
            });
           break;
           
          }
          case "readHoldingRegisters":{
            newTCP.name="readHoldingRegisters";
            newTCP.readHoldingRegisters=req.body;
            newTCP.readHoldingRegisters.slaveID=slaID;
            newTCP.readHoldingRegisters.device=device;
            newTCP.save(function(err) 
            {
              if (err)throw err;
            });
            break;
          }
          case "readInputRegisters":{
            newTCP.name="readInputRegisters";
            newTCP.readInputRegisters=req.body;
            newTCP.readInputRegisters.slaveID=slaID;
            newTCP.readInputRegisters.device=device;
            newTCP.save(function(err) 
            {
              if (err)throw err;
            });
            break;
          }
          case "writeCoil":{
            newTCP.name="writeCoil";
            newTCP.writeCoil=req.body;
            newTCP.writeCoil.slaveID=slaID;
            newTCP.writeCoil.device=device;
            newTCP.save(function(err) 
            {
              if (err)throw err;
            });
            break;
          }
          case "WriteRegisters":{
            newTCP.name="WriteRegisters";
            newTCP.WriteRegisters=req.body;
            newTCP.WriteRegisters.slaveID=slaID;
            newTCP.WriteRegisters.device=device;
            newTCP.save(function(err) 
            {
              if (err)throw err;
            });
            break;
          }
        }
       /*-------------------Tao so luong Tab--------------------*/
      
       for(var j=0;j<length;j++)
       {
        var b=parseInt(j)+ parseInt(startAddress);
         tag_tcp.push(
           {
             name        : name+"("+j+")",
             address     : b,
             device      : device,
             type        : typeModbus,
             dataType    : dataType,
             byteOrder   :  "Big Endian"
           }
         )
       }
       for (tcp of tag_tcp) {
         var newTagTCP = new tagTCP(tcp);
         newTagTCP.save(function(err){
           if (err) throw err;
         });
       }
       tag_tcp.splice(0);
    }    
   
}

