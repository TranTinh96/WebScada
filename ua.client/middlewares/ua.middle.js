 var opc=require("../models/config.opc")

 module.exports.Connection = async function(req,res,next)
 {
  var newopc = opc();
   newopc.nameOPC=req.body.nameOPC;
   newopc.url=req.body.url;
   newopc.save(function(err){
     if(err)throw err;
   });
 }
