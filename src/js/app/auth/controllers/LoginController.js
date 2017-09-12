/*
|--------------------------------------------------------------------------
| Define Controller For Login
|--------------------------------------------------------------------------
|
*/

authModule.controller('LoginController', [
    '$scope', '$state', 'AuthService',
    function ($scope, $state, AuthService)
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
         * Send the request for the user authentication.
         *
         * @return void
         */
        self.authenticate = function ()
        {
            AuthService.authenticate(self.credentials).then(
                function (response)
                {
                    notify('Login efetuado com sucesso!', 'success');

                    $state.go('dashboard');
                },
                function (response)
                {
                    show_messages(response.data, 'error');
                }
            );
        };
    }
]);
