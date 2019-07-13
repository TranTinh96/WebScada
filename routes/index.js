var express = require('express');
var router = express.Router();
var controller=require("../controllers/index.controller");

router.get('/',controller.app);
router.get("/charts",controller.chart);
router.get("/table",controller.table);  

module.exports = router;
