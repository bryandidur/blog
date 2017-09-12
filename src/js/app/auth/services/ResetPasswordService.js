/*
|--------------------------------------------------------------------------
| Reset Password Service
|--------------------------------------------------------------------------
|
*/

authModule.service('ResetPasswordService', [
    '$q', '$http', 'AuthService',
    function ($q, $http, AuthService)
    {
        /**
         * This service scope.
         *
         * @type object
         */
        var self = this;

        /**
         * Requests API URL.
         *
         * @type string
         */
        self.requestUrl = api_url('auth/reset');

        /**
         * AngularJS Promises service.
         *
         * @type object
         */
        self.qService = $q;

        /**
         * AngularJS HTTP service.
         *
         * @type object
         */
        self.httpService = $http;

        /**
         * Makes the request for reset password.
         *
         * @param  object credentials
         * @return Angular promise
         */
        self.resetPassword = function (credentials)
        {
            var deferredPromise = self.qService.defer();

            self.httpService.put(self.requestUrl, credentials).then(
                function (response)
                {
                    AuthService.setSessionData(angular.extend(response.data, {authenticated: true}));

                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        };
    }
]);
