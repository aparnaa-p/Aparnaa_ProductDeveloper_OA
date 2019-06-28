var express = require('express');
var router = express.Router();
var shipmentsDataController = require('../db/controllers/shipmentsData');
var vizConfigController = require('../db/controllers/vizConfig');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/shipmentsData', shipmentsDataController.createMultiple);
router.post('/vizConfig', vizConfigController.createOne);
router.get('/shipmentsData', shipmentsDataController.getAll);
router.get('/vizConfig/:name', vizConfigController.getOne);

module.exports = router;
