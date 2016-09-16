$(function() {

  // Setup form validation on the #register-form element
  $("#register-form").validate({

      // Specify the validation rules
       rules: {
          firstname: "required",
          lastname: "required",
          email: {
              required: true,
              email: true
          },
          mobile: {
              required: true,
              minlength: 10
          },
          nameonthecard:"required",
          cardnumber:"required",
          cvv:"required",
          agree: "required",
          month:"required"
      },

      // Specify the validation error messages
      messages: {
          firstname: "Please enter your first name",
          lastname: "Please enter your last name",
          nameonthecard: "Please enter your Card Name",
          cardnumber:"Please enter your Card Number",
          cvv:"Please enter your Card Number",
          month:"Select Month",
          mobile: {
              required: "Please enter your Moble Number",
              minlength: "Your Enter must be at least 10 Number"
          },
          email: "Please enter a valid email address",
          agree: "Please accept our policy"

          },




      submitHandler: function(form) {
          form.submit();
      }
  });



});
