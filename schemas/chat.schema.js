const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the User
const chatSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.ObjectId,
    required: true,
    unique: false
  },
});

// Create a model based on the schema
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;