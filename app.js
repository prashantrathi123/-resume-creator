var express=require('express');
var app=express();
app.use(express.static(__dirname+'/views'));
var bodyParser=require('body-parser');
var url = require('url');
var pdf = require('html-pdf');
var requestify = require('requestify');
var externalURL= 'http://localhost:8081';
var path = require('path');

app.get('/',function(req,res){

	res.render('front.ejs');
});

app.get('/download',function(req,res){

	requestify.get(externalURL).then(function (response) {
   // Get the raw HTML response body
   var html = response.body; 
   var config = {format: 'A4'}; // or format: 'letter' - see https://github.com/marcbachmann/node-html-pdf#options

// Create the PDF
   pdf.create(html, config).toFile('ress/generated.pdf', function (err, res) {
      if (err) return console.log(err);
      console.log(res); // { filename: '/pathtooutput/generated.pdf' }
   });
});
	var file = __dirname+ '/generated.pdf';
   res.download('./generated.pdf', function (err) {
       if (err) {
           console.log("Error");
           console.log(err);
       } else {
           console.log("Success");
       }
   });
	res.render('front.ejs');
});
var server=app.listen(8081,function(){

	console.log("listening on 8081");
	console.log(url.href);
});