/*
|--------------------------------------------------------------------------
| Directive For Validate Password Confirmation
|--------------------------------------------------------------------------
|
*/

validationModule.directive('validatePasswordConfirmation',
    function ()
    {
        return {
            restrict: 'A',
            require: '?ng-model',
            scope: {
                passwordToCompare: "=validatePasswordConfirmation"
            },
            link: function(scope, element, attributes, controller)
            {
                // Only apply the validator if ngModel is present
                if ( controller ) {
                    controller.$validators.validatePasswordConfirmation = function (modelValue) {
                        return modelValue == scope.passwordToCompare;
                    };

                    scope.$watch("passwordToCompare", function () {
                        controller.$validate();
                    });
                }
            }
        };
    }
);
