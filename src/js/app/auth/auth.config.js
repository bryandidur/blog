'use strict';

authModule.config([
    '$httpProvider',
    function ($httpProvider)
    {
        $httpProvider.interceptors.push('RefreshAuthorizationHeaderService');
    }
]);
