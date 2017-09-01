'use strict';

authModule.service('ForgotPasswordService', [
    '$http',
    function ($http)
    {
        var self = this;
        var apiRequestUrl = api_url('auth/reset');

        this.sendResetLinkEmail = function (email, callbacks)
        {
            var callbacks = callbacks || {};
            var data = {email: email, route: url('#!/reset/{token}')};
            var promises = {
                success: function (response)
                {
                    //

                    if ( callbacks.success ) callbacks.success(response);
                },
                error: function (response)
                {
                    //

                    if ( callbacks.error ) callbacks.error(response);
                }
            };

            $http.post(apiRequestUrl, data).then(promises.success, promises.error);
        }
    }
]);
