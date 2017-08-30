'use strict';

var appModule = angular.module('app', ['ngRoute', 'auth', 'users', 'blog']);

appModule.config([
    '$routeProvider',
    function ($routeProvider) {

        $routeProvider
            .when('/login', {
                templateUrl: 'app/auth/login/login.template.html',
                controller: 'LoginController',
            })
            .when('/reset', {
                templateUrl: 'app/auth/forgot-password/forgot-password.template.html',
                controller: 'ForgotPasswordController',
            })
            .when('/reset/:token', {
                templateUrl: 'app/auth/reset-password/reset-password.template.html',
                controller: 'ResetPasswordController',
            })
            .when('/dashboard', {
                templateUrl: 'app/blog/dashboard/dashboard.template.html',
                controller: 'DashboardController',
            })
            .when('/users', {
                templateUrl: 'app/users/users-list.template.html',
                controller: 'UsersListController',
            })
            .when('/users/register', {
                templateUrl: 'app/users/users-create.template.html',
                controller: 'UsersCreateController',
            })
            .when('/users/profile/:id', {
                templateUrl: 'app/users/users-profile.template.html',
                controller: 'UsersProfileController',
            })
            .otherwise('/login')
        ;
    }
]);
