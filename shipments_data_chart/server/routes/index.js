var express = require('express');
var router = express.Router();
var shipmentsDataController = require('../db/controllers/shipmentsData');
var vizConfigController = require('../db/controllers/vizConfig');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', (req, res, next) => {
// console.log(req);
  let uploadedFile = req.files.file;

  uploadedFile.mv(`${__dirname}/../public/uploadedFiles/${req.body.filename}.json`, err => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    res.json({ file: `public/uploadedFiles/${req.body.filename}.json` });
    console.log(res.json);
  });
});

router.post('/shipmentsData', shipmentsDataController.createMultiple);
router.post('/vizConfig', vizConfigController.createOne);
router.get('/shipmentsData', shipmentsDataController.getAll);
router.get('/vizConfig/:name', vizConfigController.getOne);

router.get('/getShipmentsData', (req, res, next) => {
  res.json({ file: 'public/uploadedFiles/ShipmentData.csv' });
})

router.get('/getJsonData', (req, res, next) => {
  res.json({ file: 'public/uploadedFiles/JsonData.json'});
})

module.exports = router;
