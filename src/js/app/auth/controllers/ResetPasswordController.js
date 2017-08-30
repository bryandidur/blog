'use strict';

authModule.controller('ResetPasswordController', [
    '$scope', '$state', '$stateParams', 'ResetPasswordService',
    function ($scope, $state, $stateParams, ResetPasswordService)
    {
        $scope.credentials = {};
        $scope.credentials.token = $stateParams.token;

        $scope.resetPassword = function (event)
        {
            event.preventDefault();

            ResetPasswordService.resetPassword($scope.credentials, {
                success: function (response)
                {
                    notify('Sua senha foi recuperada com sucesso!', 'success');

                    $state.go('dashboard');
                },
                error: function (response)
                {
                    notify('Não foi possível recuperar sua senha.', 'error');
                },
            });
        }
    },
]);
