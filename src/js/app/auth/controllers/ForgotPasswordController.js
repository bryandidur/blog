'use strict';

authModule.controller('ForgotPasswordController', [
    '$scope', 'ForgotPasswordService',
    function ($scope, ForgotPasswordService)
    {
        $scope.sendResetLinkEmail = function (event)
        {
            event.preventDefault();

            ForgotPasswordService.sendResetLinkEmail($scope.email, {
                success: function (response)
                {
                    notify('Nós enviamos à você um link para a recuperação de senha. Cheque sua caixa de entrada!', 'success');
                },
                error: function (response)
                {
                    notify('Não foi possível enviar o link para a recuperação de senha.', 'error');
                },
            });
        }
    },
]);
