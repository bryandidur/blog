'use strict';

authModule.service('ResetPasswordService', [
    '$http', 'AuthService',
    function ($http, AuthService)
    {
        var self = this;
        var apiRequestUrl = api_url('auth/reset');

        this.resetPassword = function (credentials, callbacks)
        {
            var callbacks = callbacks || {};
            var promises = {
                success: function (response)
                {
                    AuthService.succeededLogin(response, {});

                    if ( callbacks.success ) callbacks.success(response);
                },
                error: function (response)
                {
                    //

                    if ( callbacks.error ) callbacks.error(response);
                }
            };

            $http.put(apiRequestUrl, credentials).then(promises.success, promises.error);
        }
    }
]);
