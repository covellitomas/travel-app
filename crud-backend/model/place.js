const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
    id: String,
    place: String,
    hotels: Object
});

module.exports = mongoose.model('Place', placeSchema);