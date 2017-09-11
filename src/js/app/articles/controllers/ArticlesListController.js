
articlesModule.controller('ArticlesListController', [
    '$scope', 'ArticlesService',
    function ($scope, ArticlesService)
    {
        var self = $scope;
        self.articles = [];

        /**
         * Get all articles.
         *
         * @return void
         */
        self.getAll = function ()
        {
            ArticlesService.all().then(
                function (response)
                {
                    self.articles = response.data;
                },
                function (response)
                {
                    notify('Não foi possível obter a lista de artigos!', 'error');
                }
            );
        };

        self.getAll();
    }
]);
