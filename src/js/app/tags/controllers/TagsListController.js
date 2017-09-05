'use strict';

tagsModule.controller('TagsListController', [
    '$scope', '$http',
    function ($scope, $http)
    {
        $scope.getTags = function ()
        {
            var promises = {
                success: function (response)
                {
                    $scope.tags = response.data;
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.get(api_url('admin/tags')).then(promises.success, promises.error);
        };

        $scope.getTags();
    }
]);
