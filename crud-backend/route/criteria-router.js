var express = require('express');
var router = express.Router();
var Criteria = require('../model/criteria.js');

router.get('/all', function (req, res, next) {

    Criteria.find(function (err, criterias) {
        if (err) return next(err);
        res.json(criterias);
    });
});

router.post('/', function(req, res, next) {
    
    const newCriteria = new Criteria(req.body);
    newCriteria.save(req.body, function (err, rs) {
        if (err) return next(err);
        res.json(rs);
    });

});

router.delete('/all', function (req, res, next) {
    
    Criteria.remove({}, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;