'use strict';

validationModule.directive('validatePasswordConfirmation', function ()
{
    var config = {
        restrict: 'A',
        require: '?ng-model',
        scope: {
            passwordToCompare: "=validatePasswordConfirmation"
        },
        link: function(scope, elem, attrs, ctrl)
        {
            // Only apply the validator if ngModel is present
            if ( ctrl ) {
                ctrl.$validators.validatePasswordConfirmation = function (modelValue) {
                    return modelValue == scope.passwordToCompare;
                };

                scope.$watch("passwordToCompare", function () {
                    ctrl.$validate();
                });
            }
        }
    }

    return config;
});
