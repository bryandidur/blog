/*
|--------------------------------------------------------------------------
| Controller For Users Profile
|--------------------------------------------------------------------------
|
*/

usersModule.controller('UsersProfileController', [
    '$scope', '$q', '$state', '$stateParams', 'UsersService', 'AuthService',
    function ($scope, $q, $state, $stateParams, UsersService, AuthService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * Request user id.
         *
         * @type number
         */
        self.id = $stateParams.id;

        /**
         * Requested user.
         *
         * @type object
         */
        self.user = {};

        /**
         * Authenticated user.
         *
         * @type object
         */
        self.authUser = AuthService.getUser();

        /**
         * AngularJS Promises service.
         *
         * @type object
         */
        self.qService = $q;

        /**
         * Send the request to the user update.
         *
         * @return void
         */
        self.update = function ()
        {
            self.user = self.removeEmptyData(self.user);

            UsersService.update(self.user).then(
                function (response)
                {
                    notify('Perfil atualizado com sucesso!', 'success');
                },
                function (response)
                {
                    notify('Não foi possível salvar as alterações do usuário!', 'error');
                    show_messages(response.data, 'error');
                }
            );
        };

        /**
         * Send the request for the user delete.
         *
         * @return void
         */
        self.destroy = function ()
        {
            UsersService.destroy(self.id).then(
                function (response)
                {
                    if ( self.authUser.id == self.user.id ) {
                        AuthService.unAuthenticate();

                        notify('Sua conta foi deletada com sucesso!', 'success');

                        return $state.go('login');
                    }

                    notify('Usuário deletado com sucesso!', 'success');

                    $state.go('users-list');
                },
                function (response)
                {
                    notify('Não foi possível deletar o perfil do usuário!', 'error');
                }
            );
        };

        /**
         * Send the requests to get data needed by the view.
         *
         * @return void
         */
        self.getViewData = function ()
        {
            var usersPromise = UsersService.find(self.id);

            var callbacks = {
                success: function (response)
                {
                    self.user = response[0].data;
                },
                error: function (response)
                {
                   notify('Não foi possível obter os dados necessários para a edição!', 'error');
                }
            };

            self.qService.all([usersPromise]).then(callbacks.success).catch(callbacks.error);
        };

        /**
         * Removes empty keys from data object.
         *
         * @param  object data
         * @return object
         */
        self.removeEmptyData = function (data)
        {
            if ( data instanceof Object ) {
                for (key in data) {
                    if ( ! data[key] ) delete data[key];
                }
            }

            return data;
        };

        self.getViewData();
    }
]);
