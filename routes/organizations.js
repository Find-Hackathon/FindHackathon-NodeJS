var express = require('express');
var router = express.Router();
const Organization = require('../models/organizations');
const Team = require('../models/teams');

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
            if (doc.attendees.length == 24) {
                const promisee = Organization.updateOne({
                    id: req.params.id
                }, {
                    $set: {
                        closed: true
                    }
                }, {
                    $push: {
                        attendees: req.body
                    }
                }, );
                var attendeesList = [];

                doc.attendees.forEach(element => {
                    attendeesList.push(element.subscribe);
                });
                attendeesList.push(req.body.subscribe);


                shuffle(attendeesList);
                console.log(attendeesList);
                for (i = 0; i < 5; i++) {
                    var indexList = attendeesList.filter(word => attendeesList.indexOf(word) % 5 == i);
                    const team = Team({
                        id: req.params.id,
                        name: req.params.id + i,
                        attendees: [{
                                subscribe: indexList[0]
                            },
                            {
                                subscribe: indexList[1]
                            }, {
                                subscribe: indexList[2]
                            }, {
                                subscribe: indexList[3]
                            }, {
                                subscribe: indexList[4]
                            },
                        ]
                    });
                    team.save();
                    console.log(indexList);
                }
                promisee.then((data) => {
                    res.json({
                        message: "Gruplar Doldu"
                    });
                }).catch((err) => {
                    res.json({
                        isSucces: false
                    });
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

function shuffle(arra1) {
    var ctr = arra1.length,
        temp, index;

    // While there are elements in the array
    while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}


module.exports = router;