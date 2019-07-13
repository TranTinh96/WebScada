var mongoose = require('mongoose');

var ProjectSchema = mongoose.Schema({

        Project             :  {
        GetwayName          : String,
        GetwayLatitude      : String,
        GetwayLogitude      : String,
        ConnectGetway       : String,
        DataLogging         : String,
        AlarmLogging        : String,
        Cloud               : String,
        TimeUpload          : String,
        ApiLable            : String,
        AuthToken           : String
    }  
});

module.exports = mongoose.model('Getway', ProjectSchema);