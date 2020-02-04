const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
    place: Object
});

module.exports = mongoose.model('Place', placeSchema);