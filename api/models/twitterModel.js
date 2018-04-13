'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TweetSchema = new Schema({
  User: {
    type: String,
  },
  tweet_text:{
    type: String,
  },
  full_text:{
    type: String,
  },
  Created_date: {
    type: Date,
   },
   Verification_Status: {
     type: String,
   },
  Query:{
    type: String,
  }
});

module.exports = mongoose.model('Tweety', TweetSchema);
