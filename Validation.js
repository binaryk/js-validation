var App;
(function (App) {
    var Forms;
    (function (Forms) {
        var Validate = (function () {
            function Validate() {
                var _this = this;
                this.listen = function (field) {
                    var OK = true, rules = [];
                    _this.fields.forEach(function (e, i) {
                        if (e.name === field.attr('name')) {
                            rules = e.rules;
                        }
                    });
                    _this.singleValidation(field, rules);
                    return OK;
                };
                this.validate = function () {
                    _this.clear();
                    var _that = _this, OK = true;
                    _this.fields.forEach(function (e, i) {
                        var control = $('[name=' + e.name), message = '', formgroup = control.closest('.form-group');
                        control.on('keyup', function (e) {
                            _that.listen(control);
                        });
                        e.rules.forEach(function (el, j) {
                            if (!_that.validator.isOk(control, el.rule)) {
                                message += (message !== '' ? ', ' : ' ') + el.message;
                                OK = false;
                            }
                        });
                        if (message !== '') {
                            formgroup.addClass('has-error').append('<p class="help-block has-error">' + message + '</p>');
                        }
                    });
                    return OK;
                };
                this.singleValidation = function (field, rules) {
                    _this.clear(field);
                    var _that = _this, OK = true, message = '', formgroup = field.closest('.form-group');
                    rules.forEach(function (rule, j) {
                        var control = field;
                        if (!_that.validator.isOk(control, rule.rule)) {
                            message += (message !== '' ? ', ' : ' ') + rule.message;
                            OK = false;
                        }
                    });
                    if (message !== '') {
                        formgroup.addClass('has-error').append('<p class="help-block has-error">' + message + '</p>');
                    }
                    return OK;
                };
                this.clear = function (field) {
                    if (field) {
                        field.closest('.form-group').removeClass('has-error').find('.help-block').remove();
                    }
                    else {
                        _this.fields.forEach(function (e, i) {
                            var control = $('[name=' + e.name), formgroup = control.closest('.form-group');
                            formgroup.removeClass('has-error').find('.help-block').remove();
                        });
                    }
                };
                this.addRule = function (field, rule) {
                    var obj = {}, inserted = false;
                    /*cautam daca nu exista deja acest camp*/
                    _this.fields.forEach(function (e, i) {
                        if (e.name === field) {
                            e.rules.push(rule);
                            inserted = true;
                        }
                    });
                    if (!inserted) {
                        obj['name'] = field;
                        obj['rules'] = [];
                        obj['rules'].push(rule);
                        _this.fields.push(obj);
                    }
                };
                this.addField = function (field) {
                    _this.fields.push({
                        name: field,
                        rules: []
                    });
                };
                this.addRules = function (field, rules) {
                    var obj = {}, inserted = false;
                    /*cautam daca nu exista deja acest camp*/
                    _this.fields.forEach(function (e, i) {
                        if (e.name === field) {
                            e.rules = rules;
                            inserted = true;
                        }
                    });
                    if (!inserted) {
                        obj['name'] = field;
                        obj['rules'] = [];
                        obj['rules'] = rules;
                        _this.fields.push(obj);
                    }
                };
                this.getJsonData = function () {
                    var data = {};
                    _this.fields.forEach(function (e, i) {
                        data[e.name] = $('[name=' + e.name).val();
                    });
                    return data;
                };
                this.clearFields = function () {
                    _this.fields.forEach(function (e, i) {
                        $('[name=' + e.name).val('');
                    });
                    return true;
                };
                this.fields = [];
                this.validator = new Validator();
            }
            return Validate;
        })();
        Forms.Validate = Validate;
        var Validator = (function () {
            function Validator() {
                this.isOk = function (field, rule) {
                    var OK = true, fieldValue = field.val();
                    switch (rule) {
                        case 'require':
                            if (fieldValue.length > 0) {
                                return true;
                            }
                            else {
                                return false;
                            }
                            break;
                        case 'email':
                            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            return re.test(fieldValue);
                            break;
                    }
                    return OK;
                };
                this.rules = [
                    {}
                ];
            }
            return Validator;
        })();
        Forms.Validator = Validator;
    })(Forms = App.Forms || (App.Forms = {}));
})(App || (App = {}));
//# sourceMappingURL=Validation.js.map