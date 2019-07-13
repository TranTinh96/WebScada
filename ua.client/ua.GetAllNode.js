var async = require('async');

module.exports=function(app,opcua,the_session){
   app.get("/home/opcua/1", function (req, res) {
    var Nodes = [];
    var actualNodes = [];
    var newNodes = [];
    var ObjectsNodeId = {};
    var oldLength = 0, newLength;
    async.series([
        function (callback) {
            console.log("------------------------------------------------"+the_session);
            the_session.browse("RootFolder", function (err, results) {
                for (var child in results["0"].references) {
                    if (results["0"].references[child].browseName.name == "Objects") {
                        ObjectsNodeId = results["0"].references[child].nodeId.toString();
                        Nodes.push({ browseName: results["0"].references[child].browseName.name.toString(), id: results["0"].references[child].nodeId.toString(), nodeClass: results["0"].references[child]["nodeClass"].toString(), parent: "RootFolder" });
                        newLength = Nodes.length;
                        break;
                    }
                }
                callback(err);
            });
        }
    ],function (err) {
        allNodes = Nodes;
        nodesCallback(err);
    });
  });
   
}


function checkAndAdd(arr, node) {
   if (!node.hasOwnProperty("id"))
       return;
   var found = arr.some(function (el) {
       return (el.id == node.id)
   });
   if (!found) { arr.push(node); }
}

function returnChildElements(parentNodeID, cb_child) {
   var children = [];
   var browseDescription_Organizes = {
       nodeId: opcua.resolveNodeId(parentNodeID),
       referenceTypeId: "HasComponent",
       browseDirection: 0,
       includeSubtypes: true,
       nodeClassMask: 0,
       resultMask: 63
   };

   var browseDescription_HasComp = {
       nodeId: opcua.resolveNodeId(parentNodeID),
       referenceTypeId: "Organizes",
       browseDirection: 0,
       includeSubtypes: true,
       nodeClassMask: 0,
       resultMask: 63
   };
   async.series([
       function (callback_child) {
           the_session.browse(browseDescription_Organizes, function (err, results, diagnostics) {
               if (!err)
                   for (var child in results["0"].references) {
                       if (child != "findIndex") {
                           children.push({ browseName: results["0"].references[child].browseName.name.toString(), id: results["0"].references[child].nodeId.toString(), nodeClass: results["0"].references[child]["nodeClass"].toString(), parent: parentNodeID.toString() });
                       }
                   }
               callback_child(err);
           });
       },
       function (callback_child) {
           the_session.browse(browseDescription_HasComp, function (err, results, diagnostics) {
               if (!err)
                   for (var child in results["0"].references) {
                       if (child != "findIndex") {
                           children.push({ browseName: results["0"].references[child].browseName.name.toString(), id: results["0"].references[child].nodeId.toString(), nodeClass: results["0"].references[child]["nodeClass"].toString(), parent: parentNodeID.toString() });
                       }
                   }
               callback_child(err);
           });
       }
   ], function (err) {
       cb_child(children);
   });
}

function size(obj) {
   var size = 0, key;
   //Check if the object is a string, because otherwise it will return the number of letters of that string. Return 0 instead
   if (typeof obj == 'string' || obj instanceof String) return 0;
   for (key in obj) {
       if (obj.hasOwnProperty(key)) size++;
   }
   return size;
};

