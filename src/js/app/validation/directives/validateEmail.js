/*
|--------------------------------------------------------------------------
| Directive For Validate E-mails
|--------------------------------------------------------------------------
|
*/

validationModule.directive('validateEmail',
    function ()
    {
        return {
            restrict: 'A',
            require: '?ng-model',
            link: function (scope, element, attributes, controller)
            {
                // Only apply the validator if ngModel is present and AngularJS has added the email validator
                if ( controller && controller.$validators.email ) {
                    var emailREGEXP = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

                    // This will overwrite the default AngularJS email validator
                    controller.$validators.email = function (modelValue) {
                        return emailREGEXP.test(modelValue);
                    };
                }
            }
        };
    }
);
