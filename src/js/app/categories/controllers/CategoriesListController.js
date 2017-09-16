/*
|--------------------------------------------------------------------------
| Controller For Categories List
|--------------------------------------------------------------------------
|
*/

categoriesModule.controller('CategoriesListController', [
    '$scope', 'CategoriesService',
    function ($scope, CategoriesService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * All categories.
         *
         * @type array
         */
        self.categories = [];

        /**
         * Send the request to get all categories.
         *
         * @return void
         */
        self.getAll = function ()
        {
            CategoriesService.all().then(
                function (response)
                {
                    self.categories = response.data;
                },
                function (response)
                {
                    notify('Não foi possível obter as categorias!', 'error');
                }
            );
        };

        self.getAll();
    }
]);
