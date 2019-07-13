var dbConfig = require('./Configuring');

module.exports=function(mongoose){
    mongoose.connect(dbConfig.url,{useNewUrlParser: true},function(err,data){
        if(err)throw err;
        console.log("Database connect")
    });
}
