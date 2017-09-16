/*
|--------------------------------------------------------------------------
| Auth Configuration Setup
|--------------------------------------------------------------------------
|
| Set up the HTTP interceptors and other main configurations.
|
*/

authModule.config([
    '$httpProvider',
    function ($httpProvider)
    {
        $httpProvider.interceptors.push('RefreshAuthorizationHeaderService');
    }
]);
