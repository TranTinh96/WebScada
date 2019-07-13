var mongoose = require('mongoose');

var opc = mongoose.Schema({
                nameOPC             : String,
                url                 : String,
});
module.exports = mongoose.model('opcua', opc);