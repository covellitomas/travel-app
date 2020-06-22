const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name: String,
	pw: String,
	searches: [{
		criteria: [],
		places: [],
		convenience: [] 
	}]
});

module.exports = mongoose.model('User', userSchema);