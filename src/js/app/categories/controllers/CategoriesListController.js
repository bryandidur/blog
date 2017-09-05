'use strict';

categoriesModule.controller('CategoriesListController', [
    '$scope', '$http',
    function ($scope, $http)
    {
        $scope.getCategories = function ()
        {
            var promises = {
                success: function (response)
                {
                    $scope.categories = response.data;
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.get(api_url('admin/categories')).then(promises.success, promises.error);
        };

        $scope.getCategories();
    }
]);
