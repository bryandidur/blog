/*
|--------------------------------------------------------------------------
| Define The Controller For Articles Update.
|--------------------------------------------------------------------------
|
*/

articlesModule.controller('ArticlesUpdateController', [
    '$scope', '$q', '$state', '$stateParams', 'ArticlesService', 'CategoriesService', 'TagsService',
    function ($scope, $q, $state, $stateParams, ArticlesService, CategoriesService, TagsService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * Request article id.
         *
         * @type number
         */
        self.id = $stateParams.id;

        /**
         * Requested article.
         *
         * @type object
         */
        self.article = {};

        /**
         * AngularJS Promises service.
         *
         * @type object
         */
        self.qService = $q;

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
         * Send the request to the article update.
         *
         * @return void
         */
        self.update = function ()
        {
            ArticlesService.update(self.article).then(
                function (response)
                {
                    notify('Artigo editado com sucesso!', 'success');
                },
                function (response)
                {
                    notify('Não foi possível salvar as alterações do artigo!', 'error');
                    show_messages(response.data, 'error');
                }
            );
        };

        /**
         * Send the request for the article delete.
         *
         * @return void
         */
        self.destroy = function ()
        {
            ArticlesService.destroy(self.id).then(
                function (response)
                {
                    notify('Artigo deletado com sucesso!', 'success');

                    $state.go('articles-list');
                },
                function (response)
                {
                    notify('Não foi possível deletar o artigo!', 'error');
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
            var articlePromise = ArticlesService.find(self.id);

            var categoriesPromise = articlePromise.then(function (response) {
                return CategoriesService.all();
            });

            var tagsPromise = categoriesPromise.then(function (response) {
                return TagsService.all();
            });

            var callbacks = {
                success: function (response)
                {
                    self.article = response[0].data;
                    self.categories = response[1].data;
                    self.tags = response[2].data;
                },
                error: function (response)
                {
                   notify('Não foi possível obter os dados necessários para a edição!', 'error');
                }
            };

            self.qService.all([articlePromise, categoriesPromise, tagsPromise]).then(callbacks.success).catch(callbacks.error);
        };

        self.getViewData();
    }
]);
