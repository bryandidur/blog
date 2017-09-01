'use strict';

appModule.config([
    '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider)
    {
        $urlRouterProvider.otherwise('/login');

        var routeStates = {
            'login': {
                url: '/login',
                templateUrl: view('login.html'),
                controller: 'LoginController',
            },
            'forgot-password': {
                url: '/reset',
                templateUrl: view('forgot-password.html'),
                controller: 'ForgotPasswordController',
            },
            'reset-password': {
                url: '/reset/:token',
                templateUrl: view('reset-password.html'),
                controller: 'ResetPasswordController',
            },
            'root-dashboard': {
                abstract: true,
                templateUrl: view('root-dashboard.html'),
                controller: 'RootDashboardController',
            },
            'dashboard': {
                parent: 'root-dashboard',
                url: '/dashboard',
                templateUrl: view('dashboard.html'),
                controller: 'DashboardController',
            },
            'users-list': {
                parent: 'root-dashboard',
                url: '/users',
                templateUrl: view('users-list.html'),
                controller: 'UsersListController',
            },
            'users-register': {
                parent: 'root-dashboard',
                url: '/users/register',
                templateUrl: view('users-register.html'),
                controller: 'UsersRegisterController',
            },
            'users-profile': {
                parent: 'root-dashboard',
                url: '/users/profile/:id',
                templateUrl: view('users-profile.html'),
                controller: 'UsersProfileController',
            },
        };

        // Register routeStates
        for (var state in routeStates) {
            $stateProvider.state(state, routeStates[state]);
        }
    }
]);
