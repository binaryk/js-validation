declare var $;

module App.Forms {

    export interface Rule{
        rule: string;
        message: string;
    }

    export class Validate{
        fields : any;
        /*
         [
         {
         field: {
         name: "test",
         rules: [
         {
         rule: require,
         message: "Acest camp este obligatoriu"
         },
         {
         rule: require,
         message: "Acest camp este obligatoriu"
         },
         ]
         }
         }
         ]*/
        validator : Validator;

        constructor(){
            this.fields = [];
            this.validator = new Validator();
        }

        listen = (field):boolean => {
            var OK = true,
                rules = [];

            this.fields.forEach(function(e, i){
                if( e.name === field.attr('name') ){
                   rules = e.rules;
                }
            });

            this.singleValidation(field,rules);



            return OK;
        }

        validate = ():boolean => {
            this.clear();
            var _that = this,
                OK = true;
            this.fields.forEach(function(e, i){
                var control = $('[name='+e.name),
                    message = '',
                    formgroup = control.closest('.form-group');

                control.on('keyup', function(e){
                    _that.listen(control);
                })

                e.rules.forEach(function(el, j){
                    if (! _that.validator.isOk(control,el.rule)){
                        message += (message !== '' ? ', ' : ' ') + el.message;
                        OK = false;
                    }
                });
                if( message !== ''){
                    formgroup.addClass('has-error')
                        .append('<p class="help-block has-error">' + message + '</p>');
                }

            });

            return OK;
        }

        singleValidation = (field, rules: Array<Rule>):boolean => {
            this.clear(field);
            var _that = this,
                OK = true,
                message = '',
                formgroup = field.closest('.form-group');
            rules.forEach(function(rule, j){
                var control = field;
                if (! _that.validator.isOk(control,rule.rule)){
                    message += (message !== '' ? ', ' : ' ') + rule.message;
                    OK = false;
                }
            });
            if( message !== ''){
                formgroup.addClass('has-error')
                    .append('<p class="help-block has-error">' + message + '</p>');
            }
            return OK;
        }

        clear = (field?):void => {
            if( field ){
                field.closest('.form-group')
                    .removeClass('has-error')
                    .find('.help-block').remove()
            }else{
                this.fields.forEach(function(e, i){
                    var control = $('[name='+e.name),
                        formgroup = control.closest('.form-group');
                    formgroup.removeClass('has-error')
                        .find('.help-block').remove();
                });
            }
        }

        addRule = (field:string, rule: Rule):void => {
            var obj = {},
                inserted = false;
            /*cautam daca nu exista deja acest camp*/
            this.fields.forEach(function(e, i){
                if( e.name === field ){
                    e.rules.push(rule);
                    inserted = true;
                }
            });

            if(! inserted ){
                obj['name']= field;
                obj['rules'] = [];
                obj['rules'].push(rule);
                this.fields.push(obj);
            }
        }

        addField = (field:string):void => {
            this.fields.push({
                name: field,
                rules: []
            })
        }

        addRules = (field:string, rules: Array<Rule>):void => {
            var obj = {},
                inserted = false;
            /*cautam daca nu exista deja acest camp*/
            this.fields.forEach(function(e, i){
                if( e.name === field ){
                    e.rules = rules;
                    inserted = true;
                }
            });

            if(! inserted ){
                obj['name']= field;
                obj['rules'] = [];
                obj['rules'] = rules;
                this.fields.push(obj);
            }
        }

        getJsonData = ():Object => {
            var data = {};
                this.fields.forEach(function(e, i){
                    data[e.name] = $('[name='+e.name).val();
                })
            return data;
        }

        clearFields = ():boolean => {
            this.fields.forEach(function(e, i){
                $('[name='+e.name).val('');
            })
            return true;
        }



    }

    export class Validator{
        rules : Array<Object>;

        constructor(){
            this.rules = [
                {}
            ]
        }

        isOk = (field, rule):boolean => {
            var OK  = true,
                fieldValue = field.val();

            switch (rule){
                case 'require':
                    if(fieldValue.length > 0){
                        return true;
                    }else{
                        return false;
                    }
                    break;
                case 'email':
                    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(fieldValue);
                    break;
            }

            return OK;
        }


    }

}

