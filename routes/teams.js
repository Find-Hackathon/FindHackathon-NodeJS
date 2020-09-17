var express = require('express');
var router = express.Router();
const Teams = require('../models/teams');

router.get('/all', function (req, res, next) {
    const promise = Teams.find({});
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({
            errorMessage: "Gruplar Bulunamadı"
        });
    });
});

router.get('/name/:name', function (req, res, next) {
    const promise = Teams.findOne({
        name: req.params.name
    });
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({
            errorMessage: "Grup Bulunamadı"
        });
    });


});


router.get('/user/:id', function (req, res, next) {
    const promise = Teams.find({
        "attendees.subscribe": req.params.id
    });
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({
            errorMessage: "Grup Bulunamadı"
        });
    });


})



module.exports = router;