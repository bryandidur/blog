/*
|--------------------------------------------------------------------------
| Controller For Users Register
|--------------------------------------------------------------------------
|
*/

usersModule.controller('UsersRegisterController', [
    '$scope', 'UsersService',
    function ($scope, UsersService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * User to be filled.
         *
         * @type object
         */
        self.user = {};

        /**
         * Send a request for store a newly registered user.
         *
         * @return void
         */
        self.store = function ()
        {
            UsersService.store(self.user).then(
                function (response)
                {
                    self.user = {};

                    notify('Usuário registrado com sucesso!', 'success');
                },
                function (response)
                {
                    notify('Não foi possível registrar o usuário!', 'error');
                    show_messages(response.data, 'error');
                }
            );
        };
    }
]);
