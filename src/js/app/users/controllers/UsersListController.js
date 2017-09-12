/*
|--------------------------------------------------------------------------
| Controller For Users List
|--------------------------------------------------------------------------
|
*/

usersModule.controller('UsersListController', [
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
         * All users.
         *
         * @type array
         */
        self.users = [];

        /**
         * Send the request to get all users.
         *
         * @return void
         */
        self.getAll = function ()
        {
            UsersService.all().then(
                function (response)
                {
                    self.users = response.data;
                },
                function (response)
                {
                    notify('Não foi possível obter os usuários!', 'error');
                }
            );
        };

        self.getAll();
    }
]);
