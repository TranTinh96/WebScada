"use strict";
/**************************************************************
 * Copyright (c) 2019, Tran Tinh <tranngoctinh96@gmail.com>   *
 *                                                            *
 *                                                            * 
 * Modbus RTU                                                 *
 * Modbus ASCII                                               *
 *                                                            *
 *                                                            *
 **************************************************************/

module.exports=function(io,socket,mobusS,intervalIDsS) {

   
   //ReadCoils
   socket.on('FC1-S-ON', function (data) {
       if (!data) return;

       var unit = data.unit;
       var address = data.address;
       var length = data.length;
       var interval = data.interval;

       if (!unit || typeof address == 'undefined' || !length) return;
       if (interval) {
           var id = setInterval(function () {
               FC1(io,mobusS, unit, address, length);
           }, interval);

        intervalIDsS.push(id);
         
       } else {
           FC1(io,mobusS, unit, address, length);
       }
   });


   //Read Discrete Inputs
   socket.on('FC2-S-ON', function (data) {
       if (!data) return;

       var unit = data.unit;
       var address = data.address;
       var length = data.length;
       var interval = data.interval;
       if (!unit || typeof address == 'undefined' || !length) return;

       if (interval) {
           var id = setInterval(function () {
               FC2(io,mobusS, unit, address, length);
           }, interval);

           intervalIDsS.push(id);

       } else {
           FC2(io,mobusS, unit, address, length);
       }
   });


   //Read Holding Registers
   socket.on('FC3-S-ON', function (data) {
       if (!data) return;

       var unit = data.unit;
       var address = data.address;
       var length = data.length;
       var interval = data.interval;

       if (!unit || typeof address == 'undefined' || !length) return;

       if (interval) {
           var id = setInterval(function () {
               FC3(io,mobusS, unit, address, length);
           }, interval);
        
           intervalIDsS.push(id);

       } else {
           FC3(io,mobusS, unit, address, length);
       }
   });


   //Read Input Registers
   socket.on('FC4-S-ON', function (data) {
       if (!data) return;

       var unit = data.unit;
       var address = data.address;
       var length = data.length;
       var interval = data.interval;

       if (!unit || typeof address == 'undefined' || !length) return;

       if (interval) {
           var id = setInterval(function () {
               FC4(io,mobusS, unit, address, length);
           }, interval);

           intervalIDsS.push(id);

       } else {
           FC4(io,mobusS, unit, address, length);
       }
   });


   //writeCoil
   socket.on('FC5-S-ON', function (data) {
       if (!data) return;

       var unit = data.unit;
       var address = data.address;
       var state = data.state;

       if (!unit ||
           typeof address == 'undefined' ||
           typeof state == 'undefined') return;

           FC5(io,mobusS, unit, address, state);
   });



   //writeRegisters
   socket.on('FC16-S-ON', function (data) {
       if (!data) return;

       var unit = data.unit;
       var address = data.address;
       var values = data.values;

       if (!unit || typeof address == 'undefined' || !values) return;
       FC16(io,mobusS, unit, address,values);
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

var FC1 = function (io,mobusS,unit, address, length) {
    mobusS.writeFC1(unit, address, length, function (err, msg) {
        console.log("-----------------------------------------")
        console.log(msg)
        if (err) {
            console.log(err);
            io.emit('FC1-S-EM', { 'err': err });
        } else {
            io.emit('FC1-S-EM', {
                'unit':     unit,
                'type':     1,
                'address':  address,
                'data':     msg.data,
                'flag':     'get'
            });
            console.log("---------------------------------FC1-S-------------------------")
            console.log(msg.data)
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
var FC2 = function (io, mobusS, unit, address, length) {
    mobusS.writeFC2(unit, address, length,
        function (err, msg) {
            if (err) {
                console.log(err);
                io.emit('FC2-S-EM', { 'err': err });
            } else {
                io.emit('FC2-S-EM', {
                    'unit':     unit,
                    'type':     2,
                    'address':  address,
                    'data':     msg.data,
                    'flag':     'get'
                });
                console.log("---------------------------------FC2-S-------------------------")
                console.log(msg.data)
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
var FC3 = function ( io, mobusS, unit, address, length) {
    mobusS.writeFC3(unit, address, length,
        function (err, msg) {
            if (err) {
                console.log(err);
                io.emit('FC3-S-EM', { 'err': err });
            } else {
                io.emit('FC3-S-EM', {
                    'unit':     unit,
                    'type':     3,
                    'address':  address,
                    'data':     msg.data,
                    'flag':     'get'
                });
                console.log("---------------------------------FC3-S-------------------------")
                console.log(msg.data)
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
var FC4 = function (io, mobusS, unit, address, length) {
    mobusS.writeFC4(unit, address, length,
        function (err, msg) {
            if (err) {
                console.log(err);
                io.emit('FC4-S-EM', { 'err': err });
            } else {
                io.emit('FC4-S-EM', {
                    'unit':     unit,
                    'type':     4,
                    'address':  address,
                    'data':     msg.data,
                    'flag':     'get'
                });
                console.log("---------------------------------FC3-S-------------------------")
                console.log(msg.data)
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
var FC5 = function ( io, mobusS,unit, address, state) {
    mobusS.writeFC5(unit, address, state,
        function (err, msg) {
            console.log("----"+msg)
            if (err) {
                console.log(err);
                io.emit('FC5-S-EM', { 'err': err });
            } else {
                io.emit('FC5-S-EM', {
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
var FC16 = function ( io, mobusS, unit, address, values) {
    mobusS.writeFC16(unit, address, values,
        function (err, msg) {
            if (err) {
                console.log(err);
                io.emit('FC16-S-EM', { 'err': err });
            } else {
                io.emit('FC16-S-EM', {
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







