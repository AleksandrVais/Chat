const mongoose = require('mongoose');


const messageLogSchema = mongoose.Schema({

      type: String,
      senderId: Number,
      senderName: String,
      date: String,
      messageText: String
});

const messageLog = mongoose.model('message', messageLogSchema);

module.exports = messageLog;