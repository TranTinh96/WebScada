
$(function() {
     $("form[name='registration']").validate({
       rules: {
         fullname: "required",
         email: {
           required: true,
           email: true
         },
          name: {
          required: true

        },
          authorization: {
          required: true
        },
         password: {
           required: true,
           minlength: 10
         },
         password_again: {
           required: true,
           minlength: 10
         }
       },

       messages: {
         fullname: "Please enter your Full Name",
         name: "Please enter your User Name",
         authorization:"Please select your Authorization ",
         password: {
           required: "Please provide a password",
           minlength: "Your password must be at least 10 characters long"
         },
         password_again: {
           required: "Please provide a  password",
           minlength: "Your  password confirmation must be at least 10 characters long"
         },
         email: "Please enter a valid email address"
       },
       submitHandler: function(form) {
         form.submit();
       }
     });
   });