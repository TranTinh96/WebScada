var express = require('express');
var router = express.Router();

var middleware =require("../middleware/home.middleware");
var controller =require("../controllers/home.controller");

//Home
router.get('/', controller.home);

//Project
router.get('/project',controller.project);
router.post('/project',middleware.Project,controller.postProject);

//Modbus
router.get('/modbus',controller.getModbus);

router.post('/modbus',middleware.Modbus,controller.postModbus);
router.post("/modbus/devices",middleware.Serial);

router.patch("/modbus/update/serial/:id",middleware.UpdateSerial);
router.patch("/modbus/update/tcp/:id",middleware.UpdateTCP);

router.delete("/modbus/delete/serial/:id",middleware.DeleteSerial);
router.delete("/modbus/delete/tcp/:id",middleware.DeleteTCP);

router.get('/modbus/remove/:id',middleware.Remove,controller.Remove)



module.exports = router;
