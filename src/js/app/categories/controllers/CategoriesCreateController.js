/*
|--------------------------------------------------------------------------
| Controller For Categories Create
|--------------------------------------------------------------------------
|
*/

categoriesModule.controller('CategoriesCreateController', [
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
         * Category to be filled.
         *
         * @type object
         */
        self.category = {};

        /**
         * Send a request for store a newly created category.
         *
         * @return void
         */
        self.store = function ()
        {
            CategoriesService.store(self.category).then(
                function (response)
                {
                    self.category = {};

                    notify('Categoria cadastrada com sucesso!', 'success');
                },
                function (response)
                {
                    notify('Não foi possível cadastrar a categoria!', 'error');
                    show_messages(response.data, 'error');
                }
            );
        };
    }
]);
