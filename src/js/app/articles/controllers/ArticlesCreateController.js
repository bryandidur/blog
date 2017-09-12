/*
|--------------------------------------------------------------------------
| Define The Controller For Articles Create.
|--------------------------------------------------------------------------
|
*/

articlesModule.controller('ArticlesCreateController', [
    '$scope', '$q', 'ArticlesService', 'CategoriesService', 'TagsService',
    function ($scope, $q, ArticlesService, CategoriesService, TagsService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * Article to be filled.
         *
         * @type object
         */
        self.article = {status: 1};

        /**
         * Tags to be filled for the view.
         *
         * @type array
         */
        self.tags = [];

        /**
         * Categories to be filled for the view.
         *
         * @type array
         */
        self.categories = [];

        /**
         * AngularJS Promises service.
         *
         * @type object
         */
        self.qService = $q;

        /**
        * Send a request for store a newly created article.
        *
        * @return void
        */
        self.store = function ()
        {
            ArticlesService.store(self.article).then(
                function (response)
                {
                    self.article = {status: 1};

                    notify('Artigo cadastrado com sucesso!', 'success');
                },
                function (response) {
                    notify('Não foi possível cadastrar o artigo!', 'error');
                }
            );
        };

        /**
         * Get data needed by the view.
         *
         * @return void
         */
        self.getViewData = function ()
        {
            var categoriesPromise = CategoriesService.all();

            var tagsPromise = categoriesPromise.then(function (response) {
                return TagsService.all();
            });

            var callbacks = {
                success: function (response)
                {
                    self.categories = response[0].data;
                    self.tags = response[1].data;
                },
                error: function (response)
                {
                   notify('Não foi possível obter os dados necessários para o cadastro!', 'error');
                }
            };

            self.qService.all([categoriesPromise, tagsPromise]).then(callbacks.success).catch(callbacks.error);
        };

        self.getViewData();
    }
]);
