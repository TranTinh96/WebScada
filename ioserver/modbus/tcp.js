"use strict";
/**************************************************************
 * Copyright (c) 2019, Tran Tinh <tranngoctinh96@gmail.com>   *
 *                                                            *
 *                                                            * 
 * Modbus TCP                                                 *
 *                                                            *
 *                                                            *
 *                                                            *
 **************************************************************/

module.exports=function(io,socket,modbusT,intervalIDsT) {

    Led(io,socket);
    
   //ReadCoils
   socket.on('FC1_T', function (data) {
       if (!data) return;

       var unit = data.unit;
       var address = data.address;
       var length = data.length;
       var interval = data.interval;

       if (!unit || typeof address == 'undefined' || !length) return;
       if (interval) {
           var id = setInterval(function () {
               FC1(io,modbusT, unit, address, length);
           }, interval);

           intervalIDsT.push(id);

       } else {
           FC1(io,modbusT, unit, address, length);
       }
   });


   //Read Discrete Inputs
   socket.on('FC2_T', function (data) {
       if (!data) return;

       var unit = data.unit;
       var address = data.address;
       var length = data.length;
       var interval = data.interval;
       if (!unit || typeof address == 'undefined' || !length) return;

       if (interval) {
           var id = setInterval(function () {
               FC2(io,modbusT, unit, address, length);
           }, interval);

           intervalIDsT.push(id);

       } else {
           FC2(io,modbusT, unit, address, length);
       }
   });


   //Read Holding Registers
   socket.on('FC3_T', function (data) {
       if (!data) return;

       var unit = data.unit;
       var address = data.address;
       var length = data.length;
       var interval = data.interval;

       if (!unit || typeof address == 'undefined' || !length) return;

       if (interval) {
           var id = setInterval(function () {
               FC3(io,modbusT, unit, address, length);
           }, interval);

           intervalIDsT.push(id);

       } else {
           FC3(io,modbusT, unit, address, length);
       }
   });


   //Read Input Registers
   socket.on('FC4_T', function (data) {
       if (!data) return;

       var unit = data.unit;
       var address = data.address;
       var length = data.length;
       var interval = data.interval;

       if (!unit || typeof address == 'undefined' || !length) return;

       if (interval) {
           var id = setInterval(function () {
               FC4(io,modbusT, unit, address, length);
           }, interval);

           intervalIDsT.push(id);
           
       } else {
           FC4(io,modbusT, unit, address, length);
       }
   });


   //writeCoil
   socket.on('FC5_T', function (data) {
       if (!data) return;

       var unit = data.unit;
       var address = data.address;
       var state = data.state;

       if (!unit ||
           typeof address == 'undefined' ||
           typeof state == 'undefined') return;

           FC5(io,modbusT, unit, address, state);
   });



   //writeRegisters
   socket.on('FC16_T', function (data) {
       if (!data) return;

       var unit = data.unit;
       var address = data.address;
       var values = data.values;

       if (!unit || typeof address == 'undefined' || !values) return;
       FC16(io,modbusT, unit, address,values);
   });
};

/*********************************************Library Emit Socket-IO  FC1-FC2-FC3-FC4-C5-FC16************************************** */

/**
 * Write a Modbus "Read Coils" (FC=01). 
 *
 * 
 * @param {number} unit the slave unit address.
 * @param {number} address the Data Address of the first coil.
 * @param {number} length the total number of coils requested.
 * 
 * 
 */
var Led=function(io,socket){
    socket.on("Light",function(data)
    {   
        console.log(data);
        socket.emit("Led",data);      
    });
}



var FC1 = function (io,modbusT,unit, address, length) {
    modbusT.writeFC1(unit, address, length, function (err, msg) {
        if (err) {
            console.log(err);
            io.emit('datatcp', { 'err': err });
        } else {
            io.emit('datatcp', {
                'unit':     unit,
                'type':     1,
                'address':  address,
                'data':     msg.data,
                'flag':     'get'
            });
        }
    }
    );
}

/** 
* Write a Modbus "Read input status" (FC=02).
*
* 
* @param {number} unit the slave unit address.
* @param {number} address the Data Address of the first digital input.
* @param {number} length the total number of digital inputs requested.
*
*/
var FC2 = function (io, modbusT, unit, address, length) {
    modbusT.writeFC2(unit, address, length,
        function (err, msg) {
            if (err) {
                console.log(err);
                io.emit('datatcp', { 'err': err });
            } else {
                io.emit('datatcp', {
                    'unit':     unit,
                    'type':     2,
                    'address':  address,
                    'data':     msg.data,
                    'flag':     'get'
                });
            }
        }
    );
}


/**
 * Write a Modbus "Read Holding Registers" (FC=03).
 * 
 *
 * @param {number} unit the slave unit address.
 * @param {number} address the Data Address of the first register.
 * @param {number} length the total number of registers requested.
 */
var FC3 = function ( io, modbusT, unit, address, length) {
    modbusT.writeFC3(unit, address, length,
        function (err, msg) {
            if (err) {
                console.log(err);
                io.emit('datatcp', { 'err': err });
            } else {
                io.emit('datatcp', {
                    'unit':     unit,
                    'type':     3,
                    'address':  address,
                    'data':     msg.data,
                    'flag':     'get'
                });
            }
        }
    );
}


/**
 * Write a Modbus "Read Input Registers" (FC=04).
 *
 *
 * @param {number} unit the slave unit address.
 * @param {number} address the Data Address of the first register.
 * @param {number} length the total number of registers requested.
 */
var FC4 = function (io, modbusT, unit, address, length) {
    modbusT.writeFC4(unit, address, length,
        function (err, msg) {
            if (err) {
                console.log(err);
                io.emit('datatcp', { 'err': err });
            } else {
                io.emit('datatcp', {
                    'unit':     unit,
                    'type':     4,
                    'address':  address,
                    'data':     msg.data,
                    'flag':     'get'
                });
            }
        }
    );
}


/**
 * Write a Modbus "Write Single Coil" (FC=05).
 * 
 *
 * @param {number} unit the slave unit address.
 * @param {number} address the Data Address of the coil.
 * @param {number} state the state to set into coil.
 */
var FC5 = function ( io,modbusT,unit, address, state) {
    modbusT.writeFC5(unit, address, state,
        function (err, msg) {
            if (err) {
                console.log(err);
                io.emit('datatcp', { 'err': err });
            } else {
                io.emit('datatcp', {
                    'unit':     unit,
                    'type':     5,
                    'address':  address,
                    'data':     state,
                    'flag':     'set'
                });
            }
        }
    );
}


/**
 * Write a Modbus "Preset Multiple Registers" (FC=16).
 * 
 *
 * @param {number} unit the slave unit address.
 * @param {number} address the Data Address of the first register.
 * @param {array} values the array of values to write to registers.
 */
var FC16 = function ( io, modbusT, unit, address, values) {
    modbusT.writeFC16(unit, address, values,
        function (err, msg) {
            if (err) {
                console.log(err);
                io.emit('datatcp', { 'err': err });
            } else {
                io.emit('datatcp', {
                    'unit':     unit,
                    'type':     3,
                    'address':  address,
                    'data':     values,
                    'flag':     'set'
                });
            }
        }
    );
}







