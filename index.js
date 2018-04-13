var express = require('express'),
  app = express(),
  port = process.env.PORT || 8080,
  mongoose = require('mongoose'),
  Tweets = require('./api/models/twitterModel'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Twitterdb');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views',__dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/',function(req,res){
	res.render('index.html');
});

var path=require('path');
app.use(express.static(path.join(__dirname, 'public')));


var routes = require('./api/routes/twitterRoute');
routes(app);
app.listen(port);
console.log("Server running at "+port);
app.timeout=100000;
