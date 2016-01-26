var App;
(function (App) {
    var Forms;
    (function (Forms) {
        var Validate = (function () {
            function Validate() {
                var _this = this;
                this.validate = function () {
                    _this.clear();
                    _this.fields.forEach(function (e, i) {
                        var control = $('[name=' + e.name), message = '', formgroup = control.closest('.form-group');
                        e.rules.forEach(function (el, j) {
                            message += (message !== '' ? ', ' : ' ') + el.message;
                        });
                        formgroup.addClass('has-error').append('<p class="help-block has-error">' + message + '</p>');
                    });
                };
                this.clear = function () {
                    _this.fields.forEach(function (e, i) {
                        var control = $('[name=' + e.name), formgroup = control.closest('.form-group');
                        formgroup.removeClass('has-error').find('.help-block').remove();
                    });
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
                this.fields = [];
            }
            return Validate;
        })();
        Forms.Validate = Validate;
        var Rules = (function () {
            function Rules() {
            }
            return Rules;
        })();
        Forms.Rules = Rules;
    })(Forms = App.Forms || (App.Forms = {}));
})(App || (App = {}));
//# sourceMappingURL=Validation.js.map