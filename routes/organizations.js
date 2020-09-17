var express = require('express');
var router = express.Router();
const Organization = require('../models/organizations');

router.post('/createOrganization', function (req, res, next) {
    const organization = new Organization(req.body);
    const promise = organization.save();
    promise.then((data) => {
        res.json({
            success: true,
        });
    }).catch((err) => {
        res.json({
            errorMessage: "Veri Kaydedilmedi"
        });
    });
});
router.post('/organizaionSubscribe/:id', function (req, res, next) {

    const promise = Organization.findOne({
        id: req.params.id
    });
    promise.then((data) => {
        var doc = data;
        console.log(doc.attendees.length);
        if (doc.closed == false) {
            if (doc.attendees.length == 25) {
                const promisee = Organization.updateOne({
                    id: req.params.id
                }, {
                    $set: {
                        closed: true
                    }

                }, );
                promisee.then((data) => {
                    res.json({
                        closedValue: false
                    });
                }).catch((err) => {
                    res.json({
                        closedValue: true
                    });
                });
                var attendeesList = [];

                doc.attendees.forEach(element => {
                    attendeesList.push(element.subscribe);
                });
                console.log(attendeesList);
                res.json({
                    errorMessage: "Grup Doldu"
                });

            } else {

                const promise = Organization.updateOne({
                    id: req.params.id
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
            };
        } else {

            res.json({
                errorMessage: "Grup Doldu.."
            });
        }
    }).catch((err) => {
        res.json({
            errorMessage: "Kullanıcı Bulunamadı"
        });
    });

});

router.get('/all', function (req, res, next) {
    const promise = Organization.find({});
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({
            errorMessage: "Kullanıcı Bulunamadı"
        });
    });
});

router.get('/id/:id', function (req, res, next) {
    const promise = Organization.findOne({
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