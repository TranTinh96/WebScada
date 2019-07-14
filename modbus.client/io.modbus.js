var ModbusRTU = require("modbus-serial");
var tcpPort = new ModbusRTU.TcpPort("127.0.0.1", { port: parseInt(502) });
var config = require("../models/home/modbus/configuration.model")

var client = new ModbusRTU();


var modbusT;
var intervalIDsT = [];

module.exports = function (app, io) {

     app.get("/dashboard", function (req, res, next) {


          //Connection Modbus Serrial
          config.findOne({ "name": "Serial" }, function (err, serial) {
               if (err) throw err;
               if (serial === null) {
                    client.close();
                    console.log("Serial Close")
               }
               else {
                    client.connectRTU("COM1", {baudRate: 9600 })
                         .then(setClient)
                         .then(function () {
                              console.log("Modbus Serial Connection");
                         })
                         .catch(function (e) {
                              console.log(e.message);
                         });

                    function setClient() {
                         client.setID(2);
                         client.setTimeout(1000);
                    }
               }
          });

          // Connection Modbus TCP
          config.findOne({ "name": "tcp" }, function (err, tcp) {
               if (err) throw err;
               if (tcp === null) {
                    console.log("TCP Close")
                    tcpPort.close();
                    intervalIDsT.map(clearInterval);
               }
               else {
                    console.log("Modbus TCP/IP Connection")
                    modbusT = new ModbusRTU(tcpPort);
                    modbusT.open();

               }
          });
          io.on('connection', function (socket) {
               socket.on('disconnect', function () {
                    console.log('Client Disconnection');
                    intervalIDsT.map(clearInterval);
               });
               console.log('a user connected' + "-------" + socket.id);
               require("../ioserver/modbus/serial")(io, socket, client);
               require("../ioserver/modbus/tcp")(io, socket, modbusT, intervalIDsT);

          })
          res.render("dashboard");
     });
};