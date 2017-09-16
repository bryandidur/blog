/*
|--------------------------------------------------------------------------
| Controller For Tags List
|--------------------------------------------------------------------------
|
*/

tagsModule.controller('TagsListController', [
    '$scope', 'TagsService',
    function ($scope, TagsService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * All tags.
         *
         * @type array
         */
        self.tags = [];

        /**
         * Send the request to get all tags.
         *
         * @return void
         */
        self.getAll = function ()
        {
            TagsService.all().then(
                function (response)
                {
                    self.tags = response.data;
                },
                function (response)
                {
                    notify('Não foi possível obter as tags!', 'error');
                }
            );
        };

        self.getAll();
    }
]);
