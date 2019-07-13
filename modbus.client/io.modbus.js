var Modbus = require("modbus-serial");
var SerialPort = require("serialport");
var serialPort = new SerialPort("COM1", {baudRate: parseInt(9600)}, false); 
var tcpPort = new Modbus.TcpPort("127.0.0.1",{ port:parseInt(502)});
var config=require("../models/home/modbus/configuration.model")

module.exports=function(app,io){
    var modbusS;
    var modbusT;
    var intervalIDsS = [],intervalIDsT = [];
     app.get("/dashboard",function(req,res,next)
     {
            config.findOne({"name":"Serial"}, function (err, serial) {
                if (err) throw err;
                if(serial===null){
                     serialPort.close();
                     console.log("Serial Close")
                     intervalIDsS.map(clearInterval);
                }
                else{  
                     console.log("ModbusSerial Open")    
                     modbusS = new Modbus(serialPort);
                     modbusS.open();
                 }
              });
           
           config.findOne({"name":"tcp"}, function (err, tcp) {
                if (err) throw err;
                if(tcp===null){
                     console.log("TCP Close")
                     tcpPort.close();
                     intervalIDsT.map(clearInterval);
                }
                else{     
                     console.log("Modbus TCP/IP Open")
                     modbusT = new Modbus(tcpPort);
                     modbusT.open();
                     
                 }
              });
              io.on('connection', function(socket){  
                socket.on('disconnect', function(){
                     console.log('client disconnected');
                     intervalIDsS.map(clearInterval);
                     intervalIDsT.map(clearInterval);
                 }); 
                console.log('a user connected' +"-------"+socket.id);
                require("../ioserver/modbus/serial")(io,socket,modbusS,intervalIDsS );
                require("../ioserver/modbus/tcp")(io,socket,modbusT,intervalIDsT);
               
             })
             res.render("dashboard");
    });
};