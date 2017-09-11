
articlesModule.controller('ArticlesUpdateController', [
    '$scope', '$q', '$state', '$stateParams', 'ArticlesService', '$http',
    function ($scope, $q, $state, $stateParams, ArticlesService, $http)
    {
        self = $scope;
        self.article = {};
        self.tags = [];
        self.categories = [];
        self.id = $stateParams.id;
        self.qService = $q;

        /**
         * Updates the article.
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
                }
            );
        };

        /**
         * Delete the article.
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
         * Get data needed by the view.
         *
         * @return void
         */
        self.getViewData = function ()
        {
            var article = ArticlesService.find(self.id);

            var categories = article.then(function (response) {
                return getData(api_url('admin/categories'));
            })

            var tags = categories.then(function (response) {
                return getData(api_url('admin/tags'));
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

            self.qService.all([article, categories, tags]).then(callbacks.success).catch(callbacks.error);
        }

        var getData = function (url)
        {
            var deferred = $q.defer();

            var callbacks = {
                success: function (response)
                {
                     deferred.resolve(response);
                },
                error: function (response)
                {
                    deferred.reject(response);
                },
            };
            $http.get(url).then(callbacks.success, callbacks.error);

            return deferred.promise;
        };

        self.getViewData();
    }
]);
