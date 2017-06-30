import * as css from '../scss/app.scss';
import $ from 'jquery';
import jQuery from 'jquery';
import 'jquery-validation';

let submitDiv = '<div class="container main1"><h2 class=header> Thanks for contacting us, we will get back to you soon</h2><h3 class=stay>Stay in touch.........</h3><br/><ul class="row boxes"><li class="social center-block col-xs-6 col-sm-3 col-md-2"><div class=link><a href=https://www.facebook.com/foreaviation/ ><div class=facebook></div><h3 class=social-name>facebook</h3></a></div></li><li class="social center-block col-xs-6 col-sm-3 col-md-2"><div class=link><a href=https://twitter.com/ForeAviation/ ><div class=twitter></div><h3 class=social-name>twitter</h3></a></div></li><li class="social center-block col-xs-6 col-sm-3 col-md-2"><div class=link><a href=https://www.linkedin.com/organization/13271756/admin/updates><div class=linkedIn></div><h3 class=social-name>linkedIn</h3></a></div></li><li class="social center-block col-xs-6 col-sm-3 col-md-2"><div class=link><a href="https://www.instagram.com/foreaviation/?hl=en"><div class=instagram></div><h3 class=social-name>instagram</h3></a></div></li></ul></div><script type="text/javascript" src="js/contact.bundle.js?27b9eb2bda8bdbf39359"></script> <style>*{padding:0;margin:0}.main1{transform:scale(.96);width:100%;height:99vh;position:absolute;top:0;z-index:100}.header,.stay{color:#f5f5f5}.stay{text-align:center;font-size:2em}.link{width:98%;padding:1%}.link a:active,.link a:hover,.link a:visited{text-decoration:none}.link:active,.link:hover{box-shadow:5px 5px 0 #999}.facebook{background-image:url(images/facebook.png)}.facebook,.twitter{height:100px;width:150px}.twitter{background-image:url(images/twitter.png)}.linkedIn{background-image:url(images/linkedIn.png)}.instagram,.linkedIn{height:100px;width:150px}.instagram{background-image:url(images/instagram.png)}@media only screen and (min-width:320px){.header{padding-left:3%;padding-right:3%}}.boxes{transform:scale(.75)}@media only screen and (min-width:768px){.header{padding-left:10%;padding-right:10%;padding-top:20%}}@media only screen and (min-width:1020px){.main1{padding-left:15%!important}}.background{z-index:7;height:100vh;display:flex}.back-div{width:50%;height:100vh}.second{height:50%;opacity:.6}.one{background-image:url(images/aircraft-513641_640.jpg)}.three{background-image:url(images/airport-1853505_640.jpg)}.two{background-image:url(images/airport-2384837_1920.jpg)}.four{background-image:url(images/cockpit-924952_640.jpg)}.black-div{height:100vh;background-color:#000;opacity:1;z-index:3;position:relative;opacity:.8;top:-100vh}</style>';
$(()=>{
     $("form[name='data']").validate({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      name: "required",
      contactnumber:"required",
      message:"required",

      email: {
        required: true,
        // Specify that email should be validated
        // by the built-in "email" rule
        email: true
      }
    },
    // Specify validation error messages
    messages: {
      name: "Please enter your name",
      contactnumber: "Please enter your contact number",
      message: "Please enter your message",

      email: "Please enter a valid email address"
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid

  });
  console.log($('#message').val());
  // process the form
     $('.data').submit(function(event) {

        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        var formData = {
            'name'              : $('input[name=name]').val(),
            'email'             : $('input[name=email]').val(),
            'message'           : $('textarea#message').val(),
            'contactnumber'    : $('input[name=contactnumber]').val()
        };
          console.log(formData);
          let data ={};
          //to check if the form submitted has any null values
          if (!formData.name | !formData.email | !formData.message | !formData.contactnumber) {
            console.log(!formData.name | !formData.email | !formData.message | !formData.contactnumber );
          }else {
            $.ajax({
                type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
                url         : '/', // the url where we want to POST
                data        : formData, // our data object
                dataType    : 'json', // what type of data do we expect back from the server
                encode      : true,
                success     : function (retData) {
                    data = retData;
                    data.ret = true;
                    console.log(data);

                }
            }).done((e)=>{
              console.log(e);
              if(e.ret){
                $('.textbox-div').addClass("hidden").promise().done(()=>{
                  $('.ChangeItHere').html(submitDiv);
                });
              }
            })
          }

            // using the done promise callback


        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
       // return false;
    });


});
