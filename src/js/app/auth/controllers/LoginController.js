'use strict';

authModule.controller('LoginController', [
    '$scope', '$state', 'AuthService',
    function ($scope, $state, AuthService)
    {
        $scope.credentials = {};

        $scope.authenticate = function ()
        {
            AuthService.authenticate($scope.credentials, {
                success: function (response)
                {
                    notify('Login efetuado com sucesso!', 'success');

                    $state.go('dashboard');
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            });
        }
    },
]);
