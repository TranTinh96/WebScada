var mongoose = require('mongoose');

var ModbusSchema = mongoose.Schema({
        name                     :String,
        readCoils                :  {
                nameModbus          : String,
                device              : String,
                slaveID             : Number,
                typeModbus          : String,
                startAddress        : Number,
                length              : Number,
                dataType            : String
                                        },        
        readDiscreteInputs        :  {
                nameModbus          : String,
                device              : String,
                slaveID             : Number,
                typeModbus          : String,
                startAddress        : Number,
                length              : Number,
                dataType            : String
                                        },
        readHoldingRegisters     :  {
                nameModbus          : String,
                device              : String,
                slaveID             : Number,
                typeModbus          : String,
                startAddress        : Number,
                length              : Number,
                dataType            : String
                                        },        
        readInputRegisters       :  {
                nameModbus          : String,
                device              : String,
                slaveID             : Number,
                typeModbus          : String,
                startAddress        : Number,
                length              : Number,
                dataType            : String
                                        },
        writeCoil                :  {
                nameModbus          : String,
                device              : String,
                slaveID             : Number,
                typeModbus          : String,
                startAddress        : Number,
                length              : Number,
                dataType            : String
                                        },        
        writeRegisters            :  {
                nameModbus          : String,
                device              : String,
                slaveID             : Number,
                typeModbus          : String,
                startAddress        : Number,
                length              : Number,
                dataType            : String
                                       }                                                     
});

module.exports = mongoose.model('TCP', ModbusSchema);