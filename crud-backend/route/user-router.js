var express = require('express');
var router = express.Router();
var User = require('../model/user.js');

/* GET USER BY NAME AND PW */
router.get('/:name/:pw', function (req, res, next) {
    User.findOne({name: req.params.name, pw: req.params.pw}, function (err, user) {
        if (err) return next(err);
        res.json(user);
    });
});

/* GET ALL USERS */
router.get('/all', function (req, res, next) {
    User.find(function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
});

/* SAVE USER */
router.post('/save', function (req, res, next) {

    const newUser = new User(req.body);
    newUser.save((err, item) => {
        if (err) {
            res.json(err);
        } else {
            res.json(item);
        }
    });

});

/** DELETE ALL USERS */
router.delete('/all', function (req, res, next) {
    
    User.remove({}, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;