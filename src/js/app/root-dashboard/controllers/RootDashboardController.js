/*
|--------------------------------------------------------------------------
| Controller For The Root Dashboard
|--------------------------------------------------------------------------
|
*/

rootDashboardModule.controller('RootDashboardController', [
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
         * Authenticated user.
         *
         * @type object
         */
        self.authUser = AuthService.getUser();

        /**
         * Log user out of the application.
         *
         * @return void
         */
        self.logout = function ()
        {
            AuthService.unAuthenticate().then(
                function (response)
                {
                    notify('Logout efetuado com sucesso!', 'success');

                    $state.go('login');
                }
            );
        };

        // Initializes the layout scripts
        window.layoutInit();
    }
]);
