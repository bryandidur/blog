'use strict';

usersModule.controller('UsersProfileController', [
    '$scope', '$http', '$stateParams',
    function ($scope, $http, $stateParams)
    {
        $scope.getUser = function ()
        {
            var promises = {
                success: function (response)
                {
                    $scope.user = response.data;
                },
                error: function (response)
                {
                    notify('Não foi possível obter o usuário.', 'error');
                },
            };

            $http.get(api_url('admin/users/' + $stateParams.id)).then(promises.success, promises.error);
        };


        $scope.update = function (event)
        {
            event.preventDefault();

            var promises = {
                success: function (response)
                {
                    notify('Perfil atualizado com sucesso!', 'success');
                },
                error: function (response)
                {
                    notify('Não foi possível atualizar o perfil do usuário.', 'error');
                },
            };

            $http.put(api_url('admin/users/' + $stateParams.id), $scope.user).then(promises.success, promises.error);
        };

        $scope.getUser();
    }
]);
