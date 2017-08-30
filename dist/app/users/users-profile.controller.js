'use strict';

usersModule.controller('UsersProfileController', [
    '$scope', '$http', '$route',
    function ($scope, $http, $route) {

        $scope.getUser = function () {
            var promises = {
                success: function (response) {
                    $scope.user = response.data;
                    console.log('SUCCESS', response);
                },
                error: function (response) {
                    console.log('ERROR', response);
                },
            };

            $http.get('http://localhost:8000/admin/users/' + $route.current.params.id).then(promises.success, promises.error);
        };

        $scope.getUser();

        $scope.update = function (event) {
            event.preventDefault();

            var promises = {
                success: function (response) {
                    console.log('SUCCESS', response);
                },
                error: function (response) {
                    console.log('ERROR', response);
                },
            };

            $http.put('http://localhost:8000/admin/users/' + $route.current.params.id, $scope.user).then(promises.success, promises.error);
        };

        $scope.auth_user = angular.fromJson(localStorage.getItem('user'));
        var layoutInit = (function () {
            window.layoutInit();
        })();
    }
]);
