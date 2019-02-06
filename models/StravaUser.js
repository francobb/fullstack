const mongoose = require('mongoose');
const { Schema } = mongoose;

const stravaUserSchema = new Schema({
  profileId: String,
  name: String
});

mongoose.model('stravaUsers', stravaUserSchema);
