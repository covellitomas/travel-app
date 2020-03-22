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
router.post('/', function(req, res, next) {
    
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

/* GET SINGLE PLACE BY ID */
router.get('/id/:id', function (req, res, next) {
    Place.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE USER BY ID*/
router.delete('/:id', function (req, res, next) {
    
    Place.findByIdAndRemove(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.get('/name/:name', function(req, res, next) {
    Place.findOne({place: req.params.name}, function(err, post) {
        if (err) return next(err);
        res.json(post);
    });
})

module.exports = router;