# jsValidation
This is a javascript easy form validation.
### I want to develop a big library for javascript form validation. 

To use it < very simple >:

1. copy files in your project and inject them into your page
2. create an object for your form:
var validate = new App.Forms.Validate();
3. to add rule (and field) use method "addRule"
validate.addRule('email', {
rule: 'require',
message: 'This field is require'
});

4. before submit form use:
  
  if( validate.validate() ){
    myForm.submit();
  }
  
  In this case the script will validate your form and show error messages, and it return "false" into "if".
  
  
  ___
  This is the first version of library.
  I will develop it more but have patience.
