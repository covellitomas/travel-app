const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
    place: String,
    hotels: Object
});

module.exports = mongoose.model('Place', placeSchema);