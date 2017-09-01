'use strict';

authModule.factory('RefreshAuthorizationHeaderService', [
    '$q', '$injector',
    function ($q, $injector)
    {
        var getRequestAccessToken = function () {
            var AuthService = $injector.get('AuthService')
            var accessToken = AuthService.getSessionData('access_token');

            return accessToken;
        };

        var setRequestAccessToken = function (request, accessToken) {
            request.headers.Authorization = accessToken;
        };

        var getResponseAccessToken = function (rejection) {
            /// Get the refreshed access_token on Authorization header
            var refreshedAccessToken = rejection.headers('Authorization');

            return refreshedAccessToken;
        };

        var setResponseAccessToken = function (refreshedAccessToken) {
            var AuthService = $injector.get('AuthService')

            // Only update the session access_token if the request
            // was sent to the api server and its returned an new access_token
            if ( refreshedAccessToken ) {
                AuthService.setSessionData('access_token', refreshedAccessToken)
            }
        };

        this.request = function (request)
        {
            setRequestAccessToken(request, getRequestAccessToken());

            return request;
        };

        this.response = function (response)
        {
            setResponseAccessToken(getResponseAccessToken(response));

            return response;
        };

        this.responseError = function (rejection)
        {
            setResponseAccessToken(getResponseAccessToken(rejection));

            return $q.reject(rejection);
        };

        return this;
    }
]);
