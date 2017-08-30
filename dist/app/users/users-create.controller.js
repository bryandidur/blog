'use strict';

usersModule.controller('UsersCreateController', [
    '$scope', '$http',
    function ($scope, $http) {
        $scope.user = {};

        $scope.store = function (event) {
            event.preventDefault();

            var promises = {
                success: function (response) {
                    console.log('SUCCESS', response);
                },
                error: function (response) {
                    console.log('ERROR', response);
                },
            };

            $http.post('http://localhost:8000/admin/users', $scope.user).then(promises.success, promises.error);
        };

        $scope.auth_user = angular.fromJson(localStorage.getItem('user'));
        var layoutInit = (function () {
            window.layoutInit();
        })();
    }
]);
