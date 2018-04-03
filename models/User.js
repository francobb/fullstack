const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
});

mongoose.model('users', userSchema); // loads schema into mongoose