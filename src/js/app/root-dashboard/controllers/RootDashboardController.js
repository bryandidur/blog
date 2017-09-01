'use strict';

rootDashboardModule.controller('RootDashboardController', [
    '$scope', '$state', 'AuthService',
    function ($scope, $state, AuthService)
    {
        // Initializes the layout controls
        window.layoutInit();

        $scope.auth_user = AuthService.getUser();

        $scope.logout = function ()
        {
            AuthService.unAuthenticate({
                success: function (response)
                {
                    notify('Logout efetuado com sucesso!', 'success');

                    $state.go('login');
                }
            });
        };
    },
]);
