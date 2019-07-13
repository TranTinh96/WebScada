
var midd=require("./middlewares/ua.middle")

module.exports=function(app){
   //Url
   app.post("/home/opcua/connect",midd.Connection);
}