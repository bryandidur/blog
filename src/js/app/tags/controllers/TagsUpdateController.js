'use strict';

tagsModule.controller('TagsUpdateController', [
    '$scope', '$http', '$state', '$stateParams', 'AuthService',
    function ($scope, $http, $state, $stateParams, AuthService)
    {
        $scope.tag = {};

        $scope.getTag = function ()
        {
            var promises = {
                success: function (response)
                {
                    $scope.tag = response.data;
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.get(api_url('admin/tags/' + $stateParams.id)).then(promises.success, promises.error);
        };

        $scope.update = function ()
        {
            $scope.tag = clearEmptyData($scope.tag);

            var promises = {
                success: function (response)
                {
                    notify('Tag atualizada com sucesso!', 'success');
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.put(api_url('admin/tags/' + $scope.tag.id), $scope.tag).then(promises.success, promises.error);
        };

        $scope.delete = function ()
        {
            var promises = {
                success: function (response)
                {
                    notify('Tag deletada com sucesso!', 'success');
                    $state.go('tags-list');
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.delete(api_url('admin/tags/' + $scope.tag.id)).then(promises.success, promises.error);
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

        $scope.getTag();
    }
]);
