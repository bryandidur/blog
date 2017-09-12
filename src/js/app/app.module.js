/**
 * Define the main application module.
 *
 * @type object
 */
var appModule = angular.module('app', [
    'ngMessages', 'ui.router', 'ui.router.state.events',
    'validation', 'auth', 'root-dashboard', 'dashboard',
    'users', 'tags', 'categories', 'articles'
]);
