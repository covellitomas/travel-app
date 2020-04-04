const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
    name: String,
    criterias: []
});

module.exports = mongoose.model('Place', placeSchema);