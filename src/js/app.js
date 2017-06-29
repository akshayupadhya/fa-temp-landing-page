import * as css from '../scss/app.scss';
import $ from 'jquery';
import jQuery from 'jquery';
import 'jquery-validation';

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
              if(e.ret){
                $('.textbox-div').addClass("hidden").promise().done(()=>{
                  $('.ChangeItHere').load('con.html');
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
