/*
|--------------------------------------------------------------------------
| Controller For Files List
|--------------------------------------------------------------------------
|
*/

filesModule.controller('FilesListController', [
    '$scope', 'FilesService', 'ModalService',
    function ($scope, FilesService, ModalService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * All files.
         *
         * @type array
         */
        self.files = [];

        /**
         * Files details view.
         *
         * @type string
         */
        self.detailsView = view('files-update.html');

        /**
         * File details controller
         *
         * @type string
         */
        self.detailsController = 'FilesUpdateController';

        /**
         * Send the request to get all files.
         *
         * @return void
         */
        self.getAll = function ()
        {
            FilesService.all().then(
                function (response)
                {
                    self.files = response.data;
                },
                function (response)
                {
                    notify('Não foi possível obter os arquivos!', 'error');
                }
            );
        };

        /**
         * Show the file modal details.
         *
         * @param  object file
         * @return void
         */
        self.showDetails = function (file)
        {
            var modalConfig = {
                controller: self.detailsController,
                templateUrl: self.detailsView,
                inputs: {file: file}
            };

            ModalService.showModal(modalConfig).then(function (modal)
            {
                modal.element.modal('show');

                modal.close.then(function (reason)
                {
                    // Reload files if the file was deleted
                    if ( reason == 'deleted' ) {
                        self.getAll();
                    }
                });
            });
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

        self.getAll();
    }
]);
