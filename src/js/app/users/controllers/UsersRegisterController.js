'use strict';

usersModule.controller('UsersRegisterController', [
    '$scope', '$http',
    function ($scope, $http)
    {
        $scope.user = {};

        $scope.store = function ()
        {
            var promises = {
                success: function (response)
                {
                    $scope.user = {};

                    notify('Usuário registrado com sucesso!.', 'success');
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.post(api_url('admin/users'), $scope.user).then(promises.success, promises.error);
        };
    }
]);
