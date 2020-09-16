var express = require('express');
const {
    subscribe
} = require('../app');
var router = express.Router();
const Organization = require('../models/organizations');

router.post('/createOrganization', function (req, res, next) {
    const organization = new Organization(req.body);
    const promise = organization.save();
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

router.post('/organizaionSubscribe/:id', function (req, res, next) {

    const promise = Organization.updateOne({
        "id": req.params.id
    }, {
        $push: {
            attendees: req.body
        }
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

router.get('/:id', function (req, res, next) {
    res.send("succes");
});



router.delete('/:id', function (req, res, next) {
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

router.put('/:id', function (req, res, ) {
    const promise = Organization.updateOne({
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