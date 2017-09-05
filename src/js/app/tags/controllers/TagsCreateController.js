'use strict';

tagsModule.controller('TagsCreateController', [
    '$scope', '$http',
    function ($scope, $http)
    {
        $scope.tag = {};

        $scope.store = function ()
        {
            var promises = {
                success: function (response)
                {
                    $scope.tag = {};

                    notify('Tag cadastrada com sucesso!.', 'success');
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.post(api_url('admin/tags'), $scope.tag).then(promises.success, promises.error);
        }
    }
]);
