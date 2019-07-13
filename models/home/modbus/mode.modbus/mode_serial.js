var mongoose = require('mongoose');

var ModbusSchema = mongoose.Schema({
                name                : String,
                address             : Number,
                device              : String,
                type                : String,
                dataType            : String,
                byteOrder           : String                                                          
});

module.exports = mongoose.model('tagSerial', ModbusSchema);