/*
|--------------------------------------------------------------------------
| Main Files Service For HTTP Requests
|--------------------------------------------------------------------------
|
*/

filesModule.service('FilesService', [
    '$q', '$http',
    function ($q, $http)
    {
        /**
         * This service scope.
         *
         * @type object
         */
        var self = this;

        /**
         * Requests API URL.
         *
         * @type string
         */
        self.requestUrl = api_url('admin/files');

        /**
         * Makes the request for get all files on the API.
         *
         * @return Angular promise
         */
        self.all = function ()
        {
            var deferredPromise = $q.defer();

            $http.get(self.requestUrl).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        };

        /**
         * Makes the request for get an specific file on the API.
         *
         * @param  number id
         * @return Angular promise
         */
        self.find = function (id)
        {
            var deferredPromise = $q.defer();
            var requestUrl = self.requestUrl + '/' + id;

            $http.get(requestUrl).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        };

        /**
         * Makes the request for store a newly created file on the API.
         *
         * @param  object data
         * @return Angular promise
         */
        self.store = function (data)
        {
            var deferredPromise = $q.defer();
            var requestConfig = {
                headers: {'Content-Type': undefined}
            };

            $http.post(self.requestUrl, self.makeRequestableData(data), requestConfig).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        };

        /**
         * Makes the request for update file on the API.
         *
         * @param  object data
         * @return Angular promise
         */
        self.update = function (data)
        {
            var deferredPromise = $q.defer();
            var requestUrl = self.requestUrl + '/' + data.id;

            $http.put(requestUrl, data).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        };

        /**
         * Makes the request for delete file on the API.
         *
         * @param  number id
         * @return Angular promise
         */
        self.destroy = function (id)
        {
            var deferredPromise = $q.defer();
            var requestUrl = self.requestUrl + '/' + id;

            $http.delete(requestUrl).then(
                function (response)
                {
                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        };

        /**
         * Makes an form data requestable to the server.
         *
         * @param  object data
         * @return FormData
         */
        self.makeRequestableData = function (data)
        {
            var formData = new FormData();

            formData.append('disk', data.disk);
            angular.forEach(data.files, function (file, key) {
                formData.append('files[]', file);
            });

            return formData;
        };
    }
]);
