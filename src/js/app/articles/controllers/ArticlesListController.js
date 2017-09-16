/*
|--------------------------------------------------------------------------
| Define The Controller For Articles List.
|--------------------------------------------------------------------------
|
*/

articlesModule.controller('ArticlesListController', [
    '$scope', 'ArticlesService',
    function ($scope, ArticlesService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * All articles.
         *
         * @type array
         */
        self.articles = [];

        /**
         * Send the request to get all articles.
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
                    notify('Não foi possível obter os artigos!', 'error');
                }
            );
        };

        self.getAll();
    }
]);
