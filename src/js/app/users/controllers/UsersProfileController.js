'use strict';

usersModule.controller('UsersProfileController', [
    '$scope', '$http', '$state', '$stateParams', 'AuthService',
    function ($scope, $http, $state, $stateParams, AuthService)
    {
        $scope.user = {};
        $scope.authUser = AuthService.getUser();

        $scope.getUser = function ()
        {
            var promises = {
                success: function (response)
                {
                    $scope.user = response.data;
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.get(api_url('admin/users/' + $stateParams.id)).then(promises.success, promises.error);
        };

        $scope.update = function ()
        {
            $scope.user = clearEmptyData($scope.user);

            var promises = {
                success: function (response)
                {
                    notify('Perfil atualizado com sucesso!', 'success');
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.put(api_url('admin/users/' + $scope.user.id), $scope.user).then(promises.success, promises.error);
        };

        $scope.delete = function ()
        {
            var promises = {
                success: function (response)
                {
                    if ( $scope.authUser.id == $scope.user.id ) {
                        AuthService.unAuthenticate();

                        notify('Sua conta foi deletada com sucesso!', 'success');
                        $state.go('login');

                        return;
                    }

                    notify('Usuário deletado com sucesso!', 'success');
                    $state.go('users-list');
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.delete(api_url('admin/users/' + $scope.user.id)).then(promises.success, promises.error);
        };

        var clearEmptyData = function (data)
        {
            if ( data instanceof Object ) {
                for (key in data) {
                    if ( ! data[key] ) delete data[key];
                }
            }

            return data;
        }

        $scope.getUser();
    }
]);
