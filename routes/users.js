var express = require('express');
var router = express.Router();
const User = require('../models/users');

router.post('/', function (req, res, next) {
  const user = new User(req.body);
  const promise = user.save();
  promise.then((data) => {
    res.json({
      success: true
    });
  }).catch((err) => {
    res.json({
      errorMessage: "Veri Kaydedilmedi"
    });
  });
});

/* GET users listing. */
router.get('/:id', function (req, res, next) {
  const promise = User.findOne({
    id: req.params.id
  });
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json({
      errorMessage: "Kullanıcı Bulunamadı"
    });
  });


});



router.delete('/:id', function (req, res, next) {
  const promise = User.findOneAndRemove({
    id: req.params.id
  });
  promise.then((data) => {
    res.json({
      isSucces: true
    });
  }).catch((err) => {
    res.json({
      isSucces: false
    });

  });


});


router.put('/:id', function (req, res, ) {
  const promise = User.updateOne({
    "id": req.params.id
  }, {
    $set: req.body
  });
  promise.then((data) => {
    res.json({
      isSucces: true
    });
  }).catch((err) => {
    res.json({
      isSucces: false
    });

  });


});


module.exports = router;