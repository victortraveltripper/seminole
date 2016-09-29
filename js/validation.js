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
          address:"required",
          agree: "required",
          city:"required",
          zipcode:"required"
      },

      // Specify the validation error messages
      messages: {
          firstname: "",
          lastname: "",
          nameonthecard: "",
          cardnumber:"",
          cvv:"",
          month:"",
          mobile: {
              required: "",
              minlength: ""
          },
          email: "",
          address: "",
          city: "",
          zipcode: ""

          },




      submitHandler: function(form) {
        //Book your room through api call
        bookNow($("#selectedRoomTypeId").val());
        //form.submit();
      }
  });



});
