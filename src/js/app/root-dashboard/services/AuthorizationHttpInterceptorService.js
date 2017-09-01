'use strict';

rootDashboardModule.factory('AuthorizationHttpInterceptorService', [
    '$q', '$state',
    function ($q, $state)
    {
        this.responseError = function (rejection)
        {
            var status = rejection.status;

            if ( status == 401 ) {
                notify('Sua sessão foi finalizada. você precisa fazer login novamente.', 'info', 10000);
                $state.go('login');
            }

            return $q.reject(rejection);
        };

        return this;
    }
]);
