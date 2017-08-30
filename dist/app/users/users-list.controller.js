'use strict';

usersModule.controller('UsersListController', [
    '$scope', '$http',
    function ($scope, $http) {

        $scope.getUsers = function () {
            var promises = {
                success: function (response) {
                    $scope.users = response.data;
                },
                error: function (response) {
                    console.log('ERROR', response);
                },
            };

            $http.get('http://localhost:8000/admin/users').then(promises.success, promises.error);
        };

        $scope.getUsers();

        $scope.auth_user = angular.fromJson(localStorage.getItem('user'));
        var layoutInit = (function () {
            window.layoutInit();
        })();
    }
]);
