'use strict';

authModule.controller('ForgotPasswordController', [
    '$scope', '$http',
    function ($scope, $http) {
        $scope.email = '';

        $scope.sendResetLinkEmail = function (event) {
            event.preventDefault();

            $scope.data = {
                email: $scope.email,
                route: 'http://localhost:8080/#!/reset/{token}',
            };

            var promises = {
                success: function (response) {
                    console.log('SUCCESS', response);
                },
                error: function (response) {
                    console.log('ERROR', response);
                },
            };

            $http.post('http://localhost:8000/auth/reset', $scope.data).then(promises.success, promises.error);
        }
    },
]);
