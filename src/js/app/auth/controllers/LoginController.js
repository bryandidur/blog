'use strict';

authModule.controller('LoginController', [
    '$scope', '$state', 'AuthService',
    function ($scope, $state, AuthService)
    {
        $scope.credentials = {};

        $scope.authenticate = function (event)
        {
            event.preventDefault();

            AuthService.authenticate($scope.credentials, {
                success: function (response)
                {
                    notify('Login efetuado com sucesso!', 'success');

                    $state.go('dashboard');
                },
                error: function (response)
                {
                    notify('Não foi possível fazer o login.', 'error');
                },
            });
        }
    },
]);
