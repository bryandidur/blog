'use strict';

categoriesModule.controller('CategoriesCreateController', [
    '$scope', '$http',
    function ($scope, $http)
    {
        $scope.category = {};

        $scope.store = function ()
        {
            var promises = {
                success: function (response)
                {
                    $scope.category = {};

                    notify('Categoria cadastrada com sucesso!', 'success');
                },
                error: function (response)
                {
                    show_messages(response.data, 'error');
                },
            };

            $http.post(api_url('admin/categories'), $scope.category).then(promises.success, promises.error);
        }
    }
]);
