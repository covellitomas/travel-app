var express = require('express');
var router = express.Router();
var Place = require('../model/place.js');

/* GET ALL PLACES */
router.get('/all', function (req, res, next) {
    
    Place.find(function (err, places) {
        if (err) return next(err);
        res.json(places);
    });
});

/* SAVE NEW PLACE */
router.post('/save', function(req, res, next) {
    
    const newPlace = new Place(req.body);
    newPlace.save(req.body, function (err, rs) {
        if (err) return next(err);
        res.json(rs);
    });

});

/** DELETE ALL PLACES */
router.delete('/all', function (req, res, next) {
    
    Place.remove({}, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE USER */
router.post('/user', function (req, res, next) {

    const newUser = new Place(req.body);
    newUser.save((err, item) => {
        if (err) {
            res.json(err);
        } else {
            res.json(item);
        }
    });

});

/* GET SINGLE USER BY ID */
router.get('/:id', function (req, res, next) {
    Game.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* GET SINGLE USER BY NAME AND PASSWORD */
router.get('/user/:name/:password', function (req, res, next) {

    Place.findByNameAndPassword(req.params.name, req.params.password, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });

});

/* UPDATE USER BY ID*/
router.put('/:id', function (req, res, next) {
    Game.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE USER BY ID*/
router.delete('/user/:id', function (req, res, next) {
    
    Place.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;