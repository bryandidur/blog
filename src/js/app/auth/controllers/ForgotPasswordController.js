'use strict';

authModule.controller('ForgotPasswordController', [
    '$scope', 'ForgotPasswordService',
    function ($scope, ForgotPasswordService)
    {
        $scope.sendResetLinkEmail = function ()
        {
            ForgotPasswordService.sendResetLinkEmail($scope.email, {
                success: function (response)
                {
                    notify('Nós enviamos à você um link para a recuperação de senha. Cheque sua caixa de entrada!', 'success');
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            });
        }
    },
]);
