
articlesModule.controller('ArticlesCreateController', [
    '$scope', '$q', 'ArticlesService', '$http',
    function ($scope, $q, ArticlesService, $http)
    {
        self = $scope;
        self.article = {status: 1};
        self.tags = [];
        self.categories = [];
        self.qService = $q;

        /**
         * Stores the article.
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
            var categories = getData(api_url('admin/categories'));

            var tags = categories.then(function (response) {
                return getData(api_url('admin/tags'));
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

            self.qService.all([categories, tags]).then(callbacks.success).catch(callbacks.error);
        };

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
