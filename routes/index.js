var express = require('express');
let bodyParser = require('body-parser');
var nodemailer = require("nodemailer");
var xoauth2 = require("xoauth2")
var router = express.Router();
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false });

let data={};
//mailer details

var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        type : 'OAuth2',
        user: "foreaviation@gmail.com",

        clientId: '359350323331-c3jap7v0v7sdar843sochrq92vmom4cu.apps.googleusercontent.com',
        clientSecret: 'hZmciEAFiCVafQFJFBW24vfK',
        refreshToken: '1/fD4OkF7N_aV8S1wvG6535UD1S9gQZwYudjPtGnbY87U',

    },
});
/* GET home page. */

router.post('/', urlencodedParser, function (req, res) {
  console.log(Object.keys(req.body));
  data = req.body;
  res.redirect('/con');
  //res.send(req.body)
})

router.get('/con',(req,res,next)=>{
  res.json(data);
  let text= "<h1>New message</h1><h2>"+ data.name +" says:</h2><p>"+ data.message +"</p><h3>details</h3><ul><h4>contact number</h4><a href=tel:'"+ data.contactnumber+"'>"+ data.contactnumber +"</a></br><h4>email</h4><a href=mailto:'"+ data.email+"'>"+ data.email +"</a></ul>";
  var mailOptions={
        to : "foreaviation@outlook.com",
        subject : "New message",
        html : text
    }
    console.log(mailOptions);
   transporter.sendMail(mailOptions, function(error, response){
    if(error){
    console.log(error);
    res.end("error");
    }else{
    console.log("Message sent: " + response.message);
    res.end("sent");
    }
    });
});

router.get('/contact', function(req, res, next) {
  res.sendfile('./dist/contact.html');
});
module.exports = router;
