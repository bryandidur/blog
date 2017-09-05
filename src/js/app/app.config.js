'use strict';

appModule.config([
    '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider)
    {
        $urlRouterProvider.otherwise('/login');

        var routeStates = {
            // Auth
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

            // Root Dashboard | Dashboard
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

            // Users
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
                url: '/users/:id',
                templateUrl: view('users-profile.html'),
                controller: 'UsersProfileController',
            },

            // Tags
            'tags-list': {
                parent: 'root-dashboard',
                url: '/tags',
                templateUrl: view('tags-list.html'),
                controller: 'TagsListController',
            },
            'tags-create': {
                parent: 'root-dashboard',
                url: '/tags/create',
                templateUrl: view('tags-create.html'),
                controller: 'TagsCreateController',
            },
            'tags-update': {
                parent: 'root-dashboard',
                url: '/tags/:id',
                templateUrl: view('tags-update.html'),
                controller: 'TagsUpdateController',
            },
        };

        // Register routeStates
        for (var state in routeStates) {
            $stateProvider.state(state, routeStates[state]);
        }
    }
]);
