var mongoose = require('mongoose');

var ModbusSerial = mongoose.Schema({
        name                        : String,
        modbusCOM                   : {
                devicename          : String,
                slaveID             : Number,
                enable              : String,
                serialtcp           : String,
                Com                 : String,
                mode                : String,  
                baudrate            : String,
                databits            : String,
                parity              : String,
                scanrate            : String,  
                timeout             : String
       },
       modbusTCP                    : {
                devicename          : String,
                slaveID             : Number,
                enable              : String,
                serialtcp           : String,
                host                : String,
                port                : String
       }
});
module.exports = mongoose.model('Configuration', ModbusSerial);
