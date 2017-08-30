'use strict';

authModule.factory('RefreshAuthorizationHeaderService', [
    '$q', '$injector',
    function ($q, $injector)
    {
        this.request = function (request)
        {
            var AuthService = $injector.get('AuthService')
            var accessToken = AuthService.getSessionData('access_token');

            // Add Authorization header and set the access_token to it on all requests
            request.headers.Authorization = accessToken;

            return request;
        };

        this.response = function (response)
        {
            var AuthService = $injector.get('AuthService')
            // Get the refreshed access_token on Authorization header
            var refreshedAccessToken = response.headers('Authorization');

            if ( refreshedAccessToken ) {
                // Update the session access_token
                AuthService.setSessionData('access_token', refreshedAccessToken)
            }

            return response;
        };

        return this;
    }
]);
