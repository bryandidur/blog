/*
|--------------------------------------------------------------------------
| Controller For Tags Create
|--------------------------------------------------------------------------
|
*/

tagsModule.controller('TagsCreateController', [
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
         * Tag to be filled.
         *
         * @type object
         */
        self.tag = {};

        /**
         * Send a request for store a newly created tag.
         *
         * @return void
         */
        self.store = function ()
        {
            TagsService.store(self.tag).then(
                function (response)
                {
                    self.tag = {};

                    notify('Tag cadastrada com sucesso!', 'success');
                },
                function (response)
                {
                    notify('Não foi possível cadastrar a tag!', 'error');
                    show_messages(response.data, 'error');
                }
            );
        }
    }
]);
