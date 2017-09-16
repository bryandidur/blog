/*
|--------------------------------------------------------------------------
| Controller For Files Update
|--------------------------------------------------------------------------
|
*/

filesModule.controller('FilesUpdateController', [
    '$scope', 'FilesService', 'file', 'close',
    function ($scope, FilesService, file, close)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * Requested file.
         *
         * @type object
         */
        self.file = file;

        /**
         * Send the request to the file update.
         *
         * @return void
         */
        self.update = function ()
        {
            self.file = self.removeEmptyData(self.file);

            FilesService.update(self.file).then(
                function (response)
                {
                    notify('Arquivo editado com sucesso!', 'success');
                },
                function (response)
                {
                    notify('Não foi possível salvar as alterações do arquivo!', 'error');
                    show_messages(response.data, 'error');
                }
            );
        };

        /**
         * Send the request for the file delete.
         *
         * @return void
         */
        self.destroy = function ()
        {
            FilesService.destroy(self.file.id).then(
                function (response)
                {
                    notify('Arquivo deletado com sucesso!', 'success');

                    self.modalCloseReason('deleted');
                },
                function (response)
                {
                    notify('Não foi possível deletar o arquivo!', 'error');
                }
            );
        };

        /**
         * Pass the reason to the modal close promise.
         *
         * @param  string reason
         * @return void
         */
        self.modalCloseReason = function (reason)
        {
            close(reason);
        }

        /**
         * Checks if the file is an image.
         *
         * @param  object  file
         * @return bool
         */
        self.isImage = function (file)
        {
            var imageExtensions = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];

            return (imageExtensions.indexOf(file.extension) > -1);
        }

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
    }
]);
