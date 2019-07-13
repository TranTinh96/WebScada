var async = require('async');
var opcua=require("node-opcua");

var controll=require("./controllers/ua.control");
var opc=require("./models/config.opc");

//Initialize OPC Variables
var client = new opcua.OPCUAClient;

var AttributeIds = opcua.AttributeIds;
var DataTypes = opcua.DataType;
var StatusCodes = opcua.StatusCodes;
var the_session;
var allMethods, allNodes, allObjects, allVariables;



var Nodes = [];
var actualNodes = [];
var newNodes = [];
var ObjectsNodeId = {};
var oldLength = 0, newLength;

module.exports=function(app){
   app.get("/home/opcua",async function(req,res,next){
      var OPC = await opc.find();
      for (i of OPC)
      {
         endpointUrl = i.url;
      }
      async.series([
          // step 1 : disconnect if already a connection
          function (callback) {
              client.disconnect(function (err) {
                  callback(err);
              });
          },
          //step 2: Connect to the server
          function (callback) {
              client = new opcua.OPCUAClient;
              client.keepSessionAlive = true;
              client.ApplicationName = "NodeOPCUAClient";
              client.clientName = "NodeJSClient";
  
              client.connect(endpointUrl, function (err) {
                  if (err) {
                      console.log("cannot connect to endpoint :", endpointUrl);
                  } else {
                      console.log("connected !");
                  }
                  callback(err);
              })
          },
  
          // step 3 : create the session
          function (callback) {
              client.createSession(function (err, session) {
                  if (!err) {
                      the_session = session;
                      console.log("session created");
                  }
                  callback(err);
              });
          },

          // step 4 : browse
          function (callback) {
            the_session.browse("RootFolder", function (err, results) {
                if(!err){
                    console.log(results.references[0])
                    console.log(the_session);
                }
                callback(err);
            });
        }], function (err) {
          if (!err)
               console.log("Succes !")
          else
              res.status(500).send("Not Connected: " + err);
      });
      next();


   },  controll.getOPCUA)
}

