'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/twitterController');
  
  app.route('/tweets/:query')
  .get(todoList.find_tweets);

};
