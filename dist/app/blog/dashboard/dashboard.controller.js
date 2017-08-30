'use strict';

blogModule.controller('DashboardController', [
    '$scope',
    function ($scope) {

        $scope.auth_user = angular.fromJson(localStorage.getItem('user'));
        var layoutInit = (function () {
            window.layoutInit();
        })();
    },
]);
