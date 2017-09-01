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
                    show_messages(response.data, 'error');
                },
            };

            $http.get(api_url('admin/users')).then(promises.success, promises.error);
        };

        $scope.getUsers();
    }
]);
