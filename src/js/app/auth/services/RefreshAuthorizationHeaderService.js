/*
|--------------------------------------------------------------------------
| (HTTP Interceptor) Refresh Authorization Header Service
|--------------------------------------------------------------------------
|
*/

authModule.factory('RefreshAuthorizationHeaderService', [
    '$q', '$injector',
    function ($q, $injector)
    {
        /**
         * This service scope.
         *
         * @type object
         */
        var self = this;

        /**
         * AngularJS Promises service.
         *
         * @type object
         */
        self.qService = $q;

        /**
         * Get the user access token.
         *
         * @return string
         */
        self.getRequestAccessToken = function ()
        {
            var AuthService = $injector.get('AuthService')
            var accessToken = AuthService.getSessionData('access_token');

            return accessToken;
        };

        /**
         * Set the user access token to the request.
         *
         * @param object request
         * @param string accessToken
         */
        self.setRequestAccessToken = function (request, accessToken)
        {
            request.headers.Authorization = accessToken;
        };

        /**
         * Get the newly refreshed access token from the API response.
         *
         * @param  object responseORrejection
         * @return string
         */
        self.getResponseAccessToken = function (responseORrejection)
        {
            // Get the refreshed access_token on Authorization header
            var refreshedAccessToken = responseORrejection.headers('Authorization');

            return refreshedAccessToken;
        };

        /**
         * Set the newly refreshed access token to the user session.
         *
         * @param string refreshedAccessToken
         */
        self.setResponseAccessToken = function (refreshedAccessToken)
        {
            var AuthService = $injector.get('AuthService')

            // Only update the session access_token if the request
            // was sent to the api server and its returned an new access_token
            if ( refreshedAccessToken ) {
                AuthService.setSessionData('access_token', refreshedAccessToken)
            }
        };

        /**
         * Succeeded requests interceptor.
         *
         * @param  object request
         * @return object
         */
        self.request = function (request)
        {
            self.setRequestAccessToken(request, self.getRequestAccessToken());

            return request;
        };

        /**
         * Succeeded responses interceptor.
         *
         * @param  object response
         * @return object
         */
        self.response = function (response)
        {
            self.setResponseAccessToken(self.getResponseAccessToken(response));

            return response;
        };

        /**
         * Failed responses interceptor.
         *
         * @param  object rejection
         * @return Rejected Angular promise
         */
        self.responseError = function (rejection)
        {
            self.setResponseAccessToken(self.getResponseAccessToken(rejection));

            return self.qService.reject(rejection);
        };

        return self;
    }
]);
