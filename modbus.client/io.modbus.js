var Modbus = require("modbus-serial");
var tcpPort = new Modbus.TcpPort("127.0.0.1", { port: parseInt(502) });
var networkErrors = ["ESOCKETTIMEDOUT", "ETIMEDOUT", "ECONNRESET", "ECONNREFUSED", "EHOSTUNREACH"];
var config = require("../models/home/modbus/configuration.model")


var client = new Modbus();
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
                    console.log("ModbusSerial Open")
                    client.connectRTU("COM1", { baudRate: 9600 })
                         .then(setClient)
                         .then(function () {
                              console.log("Connected");
                         })
                         .catch(function (e) {
                              if (e.errno) {
                                   if (networkErrors.includes(e.errno)) {
                                        console.log("we have to reconnect");
                                   }
                              }
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
                    console.log("Modbus TCP/IP Open")
                    modbusT = new Modbus(tcpPort);
                    modbusT.open();

               }
          });
          io.on('connection', function (socket) {
               socket.on('disconnect', function () {
                    console.log('client disconnected');
                    intervalIDsT.map(clearInterval);
               });
               console.log('a user connected' + "-------" + socket.id);
               require("../ioserver/modbus/serial")(io, socket, client);
               require("../ioserver/modbus/tcp")(io, socket, modbusT, intervalIDsT);

          })
          res.render("dashboard");
     });
};