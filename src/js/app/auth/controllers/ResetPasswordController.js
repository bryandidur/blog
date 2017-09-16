/*
|--------------------------------------------------------------------------
| Define Controller For Reset Password
|--------------------------------------------------------------------------
|
*/

authModule.controller('ResetPasswordController', [
    '$scope', '$state', '$stateParams', 'ResetPasswordService',
    function ($scope, $state, $stateParams, ResetPasswordService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * User credentials.
         *
         * @type object
         */
        self.credentials = {};

        /**
         * Route token.
         *
         * @type string
         */
        self.credentials.token = $stateParams.token;

        /**
         * Send the request for reset password.
         *
         * @return void
         */
        self.resetPassword = function ()
        {
            ResetPasswordService.resetPassword(self.credentials).then(
                function (response)
                {
                    notify('Sua senha foi recuperada com sucesso!', 'success');

                    $state.go('dashboard');
                },
                function (response)
                {
                    show_messages(response.data, 'error');
                }
            );
        };
    },
]);
