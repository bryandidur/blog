'use strict';

usersModule.controller('UsersRegisterController', [
    '$scope', '$http',
    function ($scope, $http)
    {
        $scope.user = {};

        $scope.store = function (event)
        {
            event.preventDefault();

            var promises = {
                success: function (response)
                {
                    $scope.user = {};

                    notify('Usuário registrado com sucesso!.', 'success');
                },
                error: function (response)
                {
                    notify('Não foi possível registrar o usuário.', 'error');
                },
            };

            $http.post(api_url('admin/users'), $scope.user).then(promises.success, promises.error);
        };
    }
]);
