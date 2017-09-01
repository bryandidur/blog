'use strict';

validationModule.directive('validateEmail', function ()
{
    var config = {
        restrict: 'A',
        require: '?ng-model',
        link: function (scope, elem, attrs, ctrl)
        {
            // Only apply the validator if ngModel is present and AngularJS has added the email validator
            if ( ctrl && ctrl.$validators.email ) {
                var emailREGEXP = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

                // This will overwrite the default AngularJS email validator
                ctrl.$validators.email = function (modelValue) {
                    return emailREGEXP.test(modelValue);
                };
            }
        }
    }

    return config;
});
