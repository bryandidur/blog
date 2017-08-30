'use strict';

authModule.controller('ResetPasswordController', [
    '$scope', '$http', '$location', '$route',
    function ($scope, $http, $location, $route) {
        $scope.credentials = {}
        $scope.credentials.token = $route.current.params.token;

        $scope.resetPassword = function (event) {
            event.preventDefault();

            console.log($scope.credentials);

            var promises = {
                success: function (response) {
                    var data = response.data;

                    localStorage.setItem('access_token', 'Bearer ' + data.access_token);
                    localStorage.setItem('user', angular.toJson(data.user));

                    $location.url('dashboard');;
                },
                error: function (response) {
                    console.log('ERROR', response);
                },
            };

            $http.put('http://localhost:8000/auth/reset', $scope.credentials).then(promises.success, promises.error);
        }
    },
]);
