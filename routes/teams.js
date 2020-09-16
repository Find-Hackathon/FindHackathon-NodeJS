var express = require('express');
var router = express.Router();
const Teams = require('../models/teams');

router.post('/', function (req, res, next) {
    const user = new Teams(req.body);
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
    const promise = Teams.findOne({
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



module.exports = router;