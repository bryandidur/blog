/*
|--------------------------------------------------------------------------
| Define Controller For The "Forgot Password"
|--------------------------------------------------------------------------
|
*/

authModule.controller('ForgotPasswordController', [
    '$scope', 'ForgotPasswordService',
    function ($scope, ForgotPasswordService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * User email.
         *
         * @type string
         */
        self.email = '';

        /**
         * Send the request for send reset link e-mail.
         *
         * @return void
         */
        self.sendResetLinkEmail = function ()
        {
            ForgotPasswordService.sendResetLinkEmail(self.email).then(
                function (response)
                {
                    notify('Nós enviamos à você um link para a recuperação de senha. Cheque sua caixa de entrada!', 'success');
                },
                function (response)
                {
                    show_messages(response.data, 'error');
                }
            );
        };
    }
]);
