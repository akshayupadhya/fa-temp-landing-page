import * as css from '../scss/index.scss';
import $ from 'jquery';
import jQuery from 'jquery';
import 'jquery-validation';

let submitDiv = '<style>.main1{-webkit-transform:scale(.96);transform:scale(.96);width:100%;height:99vh;position:absolute;top:0;z-index:100}.header,.stay{color:#f5f5f5}.stay{text-align:center;font-size:2em}.link{width:98%;padding:1%}.link a:active,.link a:hover,.link a:visited{text-decoration:none}.link:active,.link:hover{box-shadow:5px 5px 0 #999}@media only screen and (min-width:320px){.header{padding-top:28%;padding-left:3%;padding-right:3%}}.boxes{position:relative;top:-10vh;-webkit-transform:scale(.7);transform:scale(.7)}@media only screen and (min-width:768px){.header{padding-left:10%;padding-right:10%;padding-top:35%}}@media only screen and (min-width:1020px){.main1{padding-left:15%!important}}.hundred{height:100vh}.background{z-index:8}.black-div{position:relative;top:-100vh;z-index:12}.textbox-div{position:absolute;top:0;z-index:30}</style><div class="container main1"><h2 class=header> Thanks for contacting us, we will get back to you soon</h2></div>';
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

//service worker
 