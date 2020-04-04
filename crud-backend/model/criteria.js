const mongoose = require('mongoose');

const criteriaSchema = mongoose.Schema({
    name: String,
    children: []
});

module.exports = mongoose.model('Criteria', criteriaSchema);