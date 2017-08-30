'use strict';

authModule.controller('LoginController', [
    '$scope', '$http', '$location',
    function ($scope, $http, $location) {
        $scope.users = [];
        $scope.credentials = {};

        /**
         * Authenticate user
         * @param  {[type]} event [description]
         * @return {[type]}       [description]
         */
        $scope.authenticate = function (event) {
            event.preventDefault();

            var promises = {
                success: function (response) {
                    var data = response.data;

                    localStorage.setItem('access_token', 'Bearer ' + data.access_token);
                    localStorage.setItem('user', angular.toJson(data.user));

                    $location.url('dashboard');
                },
                error: function (response) {
                    console.log('ERROR', response);
                },
            };

            $http.post('http://localhost:8000/auth', $scope.credentials).then(promises.success, promises.error);
        };

        /**
         * Getusers
         * @return {[type]} [description]
         */
        $scope.getUsers = function () {

            var promises = {
                success: function (response) {
                    $scope.users = response.data;
                    console.log('SUCCESS', response);
                },
                error: function (response) {
                    console.log('ERROR', response);
                },
            };

            $http.get('http://localhost:8000/admin/users').then(promises.success, promises.error);
        };
    },
]);
