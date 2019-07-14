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

module.exports = function (io, socket, client) {


    //FC1-Read Coil Status
    socket.on("FC1-S-ON", function (data) {
        if (!data) return;
        var address = data.address;
        var length = data.length;
        var interval = data.interval
        if (interval) {
            setInterval(function () {
                client.readCoils(address, length, function (err, msg) {
                    if (err) {
                        console.log(err);
                        io.emit('FC1-S-EM', { 'err': err });
                    } else {
                        io.emit('FC1-S-EM', {
                            'type': 1,
                            'address': address,
                            'data': msg.data,
                            'flag': 'get'
                        });
                    }
                });
            }, interval);
        } else {
            client.readCoils(address, length, function (err, msg) {
                if (err) {
                    console.log(err);
                    io.emit('FC1-S-EM', { 'err': err });
                } else {
                    io.emit('FC1-S-EM', {
                        'type': 1,
                        'address': address,
                        'data': msg.data,
                        'flag': 'get'
                    });
                }
            });
        }
    });


    //Read Discrete Inputs
    socket.on("FC2-S-ON", function (data) {
        if (!data) return;
        var address = data.address;
        var length = data.length;
        var interval = data.interval
        if (interval) {
            setInterval(function () {
                client.readDiscreteInputs(address, length, function (err, msg) {
                    console.log(msg.data)
                    if (err) {
                        console.log(err);
                        io.emit('FC2-S-EM', { 'err': err });
                    } else {
                        io.emit('FC2-S-EM', {
                            'type': 1,
                            'address': address,
                            'data': msg.data,
                            'flag': 'get'
                        });
                    }
                });
            }, interval);
        } else {
            client.readDiscreteInputs(address, length, function (err, msg) {
                console.log(msg.data)
                if (err) {
                    console.log(err);
                    io.emit('FC2-S-EM', { 'err': err });
                } else {
                    io.emit('FC2-S-EM', {
                        'type': 1,
                        'address': address,
                        'data': msg.data,
                        'flag': 'get'
                    });
                }
            });
        }
    })


    //FC3-Read Holding Registers
    socket.on("FC3-S-ON", function (data) {
        if (!data) return;
        var address = data.address;
        var length = data.length;
        var interval = data.interval
        if (interval) {
            setInterval(function () {
                client.readHoldingRegisters(address, length, function (err, msg) {
                    console.log(msg.data)
                    if (err) {
                        console.log(err);
                        io.emit('FC3-S-EM', { 'err': err });
                    } else {
                        io.emit('FC3-S-EM', {
                            'type': 1,
                            'address': address,
                            'data': msg.data,
                            'flag': 'get'
                        });
                    }
                });
            }, interval);
        } else {
            client.readHoldingRegisters(address, length, function (err, msg) {
                console.log(msg.data)
                if (err) {
                    console.log(err);
                    io.emit('FC3-S-EM', { 'err': err });
                } else {
                    io.emit('FC3-S-EM', {
                        'type': 1,
                        'address': address,
                        'data': msg.data,
                        'flag': 'get'
                    });
                }
            });
        }
    })




    // FC4 Read Input Registers
    socket.on("FC4-S-ON", function (data) {
        if (!data) return;
        var address = data.address;
        var length = data.length;
        var interval = data.interval
        if (interval) {
            setInterval(function () {
                client.readInputRegisters(address, length, function (err, msg) {
                    console.log(msg.data)
                    if (err) throw err;
                    io.emit("FC1-S-EM", {
                        'type': 1,
                        'address': address,
                        'data': msg.data,
                        'flag': 'get'
                    })
                });
            }, interval);
        } else {
            client.readInputRegisters(address, length, function (err, msg) {
                console.log(msg.data)
                if (err) throw err;
                io.emit("FC1-S-EM", {
                    'type': 1,
                    'address': address,
                    'data': msg.data,
                    'flag': 'get'
                })
            });
        }
    })


    //FC5 WriteCoil
    socket.on('FC5-S-ON', function (data) {
        if (!data) return;
        var address = data.address;
        var state = data.state;

        if (typeof address == 'undefined' || typeof state == 'undefined') return;
        client.writeCoil(address, state, function (err, msg) {
            if (err) {
                console.log(err);
                io.emit('FC5-S-EM', { 'err': err });
            } else {
                io.emit('FC5-S-EM', {
                    'type': 5,
                    'address': address,
                    'data': state,
                    'flag': 'set'
                });
                console.log("------------------------------------")
            }
        }
        );
    });


    //writeRegisters
    socket.on('FC16-S-ON', function (data) {
        if (!data) return;

        var address = data.address;
        var values = data.values;
        if (typeof address == 'undefined' || !values) return;
        client.writeRegisters(address, values, function (err, msg) {
            console.log(msg)
            if (err) {
                console.log(err);
                io.emit('FC16-S-EM', { 'err': err });
            } else {
                io.emit('FC16-S-EM', {
                    'type': 3,
                    'address': address,
                    'data': values,
                    'flag': 'set'
                });
            }
        }
        );

    });
};


