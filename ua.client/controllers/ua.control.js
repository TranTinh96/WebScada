var opc =require("../models/config.opc");

module.exports.getOPCUA= async function(req,res,next){
   var Opc=await opc.find();
   res.render("home/home-opcua",{
         Opc :Opc
   });
}