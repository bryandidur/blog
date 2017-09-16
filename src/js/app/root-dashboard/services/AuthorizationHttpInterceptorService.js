/*
|--------------------------------------------------------------------------
| (HTTP Interceptor) Authorization Http Interceptor Service
|--------------------------------------------------------------------------
|
*/

rootDashboardModule.factory('AuthorizationHttpInterceptorService', [
    '$q', '$state',
    function ($q, $state)
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
         * State service.
         *
         * @type object
         */
        self.stateService = $state;

        /**
         * Failed responses interceptor.
         *
         * @param  object rejection
         * @return Rejected Angular promise
         */
        self.responseError = function (rejection)
        {
            var status = rejection.status;

            // Check if the response was sent with Unauthorized status
            if ( status == 401 ) {
                notify('Sua sessão foi finalizada. você precisa fazer login novamente.', 'info', 10000);
                self.stateService.go('login');
            }

            return self.qService.reject(rejection);
        };

        return self;
    }
]);
