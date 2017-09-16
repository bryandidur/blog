/*
|--------------------------------------------------------------------------
| Controller For Categories Update
|--------------------------------------------------------------------------
|
*/

categoriesModule.controller('CategoriesUpdateController', [
    '$scope', '$q', '$state', '$stateParams', 'CategoriesService',
    function ($scope, $q, $state, $stateParams, CategoriesService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * Request category id.
         *
         * @type number
         */
        self.id = $stateParams.id;

        /**
         * Requested category.
         *
         * @type object
         */
        self.category = {};

        /**
         * AngularJS Promises service.
         *
         * @type object
         */
        self.qService = $q;

        /**
         * Send the request to the category update.
         *
         * @return void
         */
        self.update = function ()
        {
            self.category = self.removeEmptyData(self.category);

            CategoriesService.update(self.category).then(
                function (response)
                {
                    notify('Categoria editada com sucesso!', 'success');
                },
                function (response)
                {
                    notify('Não foi possível salvar as alterações da categoria!', 'error');
                    show_messages(response.data, 'error');
                }
            );
        };

        /**
         * Send the request for the category delete.
         *
         * @return void
         */
        self.destroy = function ()
        {
            CategoriesService.destroy(self.id).then(
                function (response)
                {
                    notify('Categoria deletada com sucesso!', 'success');

                    $state.go('categories-list');
                },
                function (response)
                {
                    notify('Não foi possível deletar a categoria!', 'error');
                }
            );
        };

        /**
         * Send the requests to get data needed by the view.
         *
         * @return void
         */
        self.getViewData = function ()
        {
            var categoryPromise = CategoriesService.find(self.id);

            var callbacks = {
                success: function (response)
                {
                    self.category = response[0].data;
                },
                error: function (response)
                {
                   notify('Não foi possível obter os dados necessários para a edição!', 'error');
                }
            };

            self.qService.all([categoryPromise]).then(callbacks.success).catch(callbacks.error);
        };

        /**
         * Removes empty keys from data object.
         *
         * @param  object data
         * @return object
         */
        self.removeEmptyData = function (data)
        {
            if ( data instanceof Object ) {
                for (key in data) {
                    if ( ! data[key] ) delete data[key];
                }
            }

            return data;
        };

        self.getViewData();
    }
]);
