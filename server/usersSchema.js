const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: String,
    name: String,
    twitter: String,
    vk: String,
    fb: String
});

const user = mongoose.model('user', userSchema);

module.exports = user;