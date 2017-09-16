/*
|--------------------------------------------------------------------------
| Controller For Files Upload
|--------------------------------------------------------------------------
|
*/

filesModule.controller('FilesUploadController', [
    '$scope', 'FilesService',
    function ($scope, FilesService)
    {
        /**
         * This controller scope.
         *
         * @type object
         */
        var self = $scope;

        /**
         * Files data.
         *
         * @type object
         */
        self.data = {};

        /**
         * Files disk.
         *
         * @type object
         */
        self.data.disk = 's3';

        /**
         * Files to be uploaded.
         *
         * @type object
         */
        self.data.files = [];

        /**
         * Send a request for store a newly created file.
         *
         * @return void
         */
        self.store = function ()
        {
            FilesService.store(self.data).then(
                function (response)
                {
                    self.data.disk = 's3';

                    notify('Os arquivos foram enviados para o upload!', 'success');
                },
                function (response)
                {
                    notify('Não foi possível enviar os arquivos para o upload!', 'error');
                    show_messages(response.data, 'error');
                }
            );
        };
    }
]);
