'use strict';

categoriesModule.controller('CategoriesUpdateController', [
    '$scope', '$http', '$state', '$stateParams',
    function ($scope, $http, $state, $stateParams)
    {
        $scope.category = {};

        $scope.getCategory = function ()
        {
            var promises = {
                success: function (response)
                {
                    $scope.category = response.data;
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.get(api_url('admin/categories/' + $stateParams.id)).then(promises.success, promises.error);
        };

        $scope.update = function ()
        {
            $scope.category = clearEmptyData($scope.category);

            var promises = {
                success: function (response)
                {
                    notify('Categoria atualizada com sucesso!', 'success');
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.put(api_url('admin/categories/' + $scope.category.id), $scope.category).then(promises.success, promises.error);
        };

        $scope.delete = function ()
        {
            var promises = {
                success: function (response)
                {
                    notify('Categoria deletada com sucesso!', 'success');
                    $state.go('categories-list');
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.delete(api_url('admin/categories/' + $scope.category.id)).then(promises.success, promises.error);
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

        $scope.getCategory();
    }
]);
