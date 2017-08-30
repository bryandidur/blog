'use strict';

angular.module('blog').config([
    '$locationProvider', '$stateProvider',
    function ($locationProvider, $stateProvider) {
        // $locationProvider.hashPrefix('!');

        $stateProvider
            .state('login', {
                url: '/login',
                // templateUrl: view('auth/login.html'),
                component: 'LoginComponent',
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: view('dashboard.html'),
            })
        ;
    }
]);

angular.module('blog').component('LoginComponent', {
    templateUrl: view('auth/login.html'),
    controller: function () {
        alert('COMPONENT');
    }
});

angular.module('blog').run(function($transitions) {
    $transitions.onSuccess({}, function(trans) {
        layoutInit();
    });
})
