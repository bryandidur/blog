/*
|--------------------------------------------------------------------------
| Controller For Tags Update
|--------------------------------------------------------------------------
|
*/

tagsModule.controller('TagsUpdateController', [
    '$scope', '$q', '$state', '$stateParams', 'TagsService',
    function ($scope, $q, $state, $stateParams, TagsService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * Request tag id.
         *
         * @type number
         */
        self.id = $stateParams.id;

        /**
         * Requested tag.
         *
         * @type object
         */
        self.tag = {};

        /**
         * AngularJS Promises service.
         *
         * @type object
         */
        self.qService = $q;

        /**
         * Send the request to the tag update.
         *
         * @return void
         */
        self.update = function ()
        {
            self.tag = self.removeEmptyData(self.tag);

            TagsService.update(self.tag).then(
                function (response)
                {
                    notify('Tag editada com sucesso!', 'success');
                },
                function (response)
                {
                    notify('Não foi possível salvar as alterações da tag!', 'error');
                    show_messages(response.data, 'error');
                }
            );
        };

        /**
         * Send the request for the tag delete.
         *
         * @return void
         */
        self.destroy = function ()
        {
            TagsService.destroy(self.id).then(
                function (response)
                {
                    notify('Tag deletada com sucesso!', 'success');

                    $state.go('categories-list');
                },
                function (response)
                {
                    notify('Não foi possível deletar a tag!', 'error');
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
            var tagPromise = TagsService.find(self.id);

            var callbacks = {
                success: function (response)
                {
                    self.tag = response[0].data;
                },
                error: function (response)
                {
                   notify('Não foi possível obter os dados necessários para a edição!', 'error');
                }
            };

            self.qService.all([tagPromise]).then(callbacks.success).catch(callbacks.error);
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
