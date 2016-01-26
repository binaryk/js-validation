/// <reference path="Validation.ts" />
class Reviews{

    constructor(){
        this.init();
    }

    init = ():void => {
        var validate = new App.Forms.Validate();
        validate.addRule(
            "name",
            {
                rule: 'require',
                message: 'The "Name" field is required'
            }
        )
        validate.addRules(
            "email",
            [
                {
                    rule: 'require',
                    message: 'The "Email" field is required'
                },
                {
                    rule: 'email',
                    message: 'The "Email" field is not valid'
                }
            ]
        )
        validate.addRule(
            "message",
            {
                rule: 'require',
                message: 'The "Message" field is required'
            }
        )

        $('#add_message').on('click', function(e){
            if( validate.validate() ){
                alert('Succes');
            }
        })
    }
}