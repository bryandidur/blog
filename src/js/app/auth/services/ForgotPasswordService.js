/*
|--------------------------------------------------------------------------
| Forgot Password Service
|--------------------------------------------------------------------------
|
*/

authModule.service('ForgotPasswordService', [
    '$q', '$http',
    function ($q, $http)
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
         * URL to reset password.
         * @type string
         */
        self.resetPasswordURL = url('#!/reset/{token}');

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
         * Makes the request for send reset link e-mail.
         *
         * @param  string email
         * @return Angular promise
         */
        self.sendResetLinkEmail = function (email)
        {
            var deferredPromise = self.qService.defer();
            var data = {email: email, route: self.resetPasswordURL};

            self.httpService.post(self.requestUrl, data).then(
                function (response)
                {
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
