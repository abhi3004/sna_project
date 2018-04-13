var mongoose = require('mongoose'),
  Tweety = mongoose.model('Tweety');
  exports.find_tweets=function(req,res){
  var Twitter=require("twitter");
  var client = new Twitter({

    consumer_key: '7th0fxQRChhd5dbGsrXqGGE8W',
    consumer_secret: 'VyZHNsNO5NMrPZQm4B4HEgBpoPmSkz6CvPf3GmVCAzMhhvrLcG',
    access_token_key: '728679716-MizZNAMFiSrGdHuTQQoFee5VPaDjXixur3rf7IZr',
    access_token_secret: '1y8oEX5J2Ia5dy8jkFgzi1ZOcYxLoFDGwyhzLfVpPoF9q'
  });
  var _query= req.params.query;
  var tweet="";
  var tweets=[];
  client.stream('statuses/filter', {track: _query}, function(stream) {
    stream.on('data', function(event){

      if(tweets.length<1000){
        tweet=event;
        var saved_tweet=new Tweety({
          User:tweet.user.name,
          tweet_text:tweet.text,
          full_text:tweet.retweeted_status.extended_tweet.full_text,
          Created_date:tweet.created_at,
          Verification_Status:tweet.user.verified,
          Query:_query
        });
        saved_tweet.save(function(error){
          console.log("saved");
          console.log(tweets.length);
             if (error) {
       console.error(error);
    }
        });
        


      tweets.push(tweet);
      tweet="";
      //console.log(tweets);
    }
      else{stream.destroy();

      res.send("Done");
    }
      });
  stream.on('error', function(error) {
      console.log("Error");
    });
  });
  };
