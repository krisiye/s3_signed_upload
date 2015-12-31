var express = require('express')
var app = express()
var AWS = require('aws-sdk');
var bodyParser = require('body-parser');

var AWS_ACCESS_KEY = 'XXXX';
var AWS_SECRET_KEY = 'XXXX';
AWS.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
AWS.config.region = '';

app.use("/app",express.static(__dirname + '/app'));
app.use("/bower_components",express.static(__dirname + '/bower_components'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/signedPUTUrl', function (req, res) {
	var s3 = new AWS.S3();
	var params = {Bucket: 'isg-spaces-nonprod-user-uploads', Key: req.body.name, ContentType: req.body.type};
	s3.getSignedUrl('putObject', params, function(err, url) {
		if(err) console.log(err);
		res.json({url: url});
	});
})

app.post('/signedGETUrl', function (req, res) {
        var s3 = new AWS.S3();
        var params = {Bucket: 'isg-spaces-nonprod-user-uploads', Key: req.body.name};
        s3.getSignedUrl('getObject', params, function(err, url) {
                if(err) console.log(err);
                res.json({url: url});
        });
})

var server = app.listen(8000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
