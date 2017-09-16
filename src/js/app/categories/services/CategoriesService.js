/*
|--------------------------------------------------------------------------
| Main Categories Service
|--------------------------------------------------------------------------
|
*/

categoriesModule.service('CategoriesService', [
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
        self.requestUrl = api_url('admin/categories');

        /**
         * AngularJS Promises service.
         *
         * @type object
         */
        self.qService = $q;

        /**
         * AngularJS HTTP service.
         *
         * @type object
         */
        self.httpService = $http;

        /**
         * Makes the request for get all categories on the API.
         *
         * @return Angular promise
         */
        self.all = function ()
        {
            var deferredPromise = self.qService.defer();

            self.httpService.get(self.requestUrl).then(
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
         * Makes the request for get an specific category on the API.
         *
         * @param  number id
         * @return Angular promise
         */
        self.find = function (id)
        {
            var deferredPromise = self.qService.defer();
            var requestUrl = self.requestUrl + '/' + id;

            self.httpService.get(requestUrl).then(
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
        }

        /**
         * Makes the request for store a newly created category on the API.
         *
         * @param  object data
         * @return Angular promise
         */
        self.store = function (data)
        {
            var deferredPromise = self.qService.defer();

            self.httpService.post(self.requestUrl, data).then(
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
         * Makes the request for update category on the API.
         *
         * @param  object data
         * @return Angular promise
         */
        self.update = function (data)
        {
            var deferredPromise = self.qService.defer();
            var requestUrl = self.requestUrl + '/' + data.id;

            self.httpService.put(requestUrl, data).then(
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
         * Makes the request for delete category on the API.
         *
         * @param  number id
         * @return Angular promise
         */
        self.destroy = function (id)
        {
            var deferredPromise = self.qService.defer();
            var requestUrl = self.requestUrl + '/' + id;

            self.httpService.delete(requestUrl).then(
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
        }
    }
]);
