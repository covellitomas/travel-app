const mongoose = require('mongoose');

const criteriaSchema = mongoose.Schema({
    id: String,
    description: String,
    parentId: String
});

module.exports = mongoose.model('Criteria', criteriaSchema);