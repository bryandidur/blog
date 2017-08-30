'use strict';

usersModule.controller('UsersListController', [
    '$scope', '$http',
    function ($scope, $http)
    {
        $scope.getUsers = function ()
        {
            var promises = {
                success: function (response)
                {
                    $scope.users = response.data;
                },
                error: function (response)
                {
                    notify('Não foi possível listar os usuários.', 'error');
                },
            };

            $http.get(api_url('admin/users')).then(promises.success, promises.error);
        };

        $scope.getUsers();
    }
]);
