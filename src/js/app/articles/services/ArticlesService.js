/*
|--------------------------------------------------------------------------
| Define The Main Articles Service
|--------------------------------------------------------------------------
|
*/

articlesModule.service('ArticlesService', [
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
        self.requestUrl = api_url('admin/articles');

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
         * Makes the request for get all articles.
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
        }

        /**
         * Makes the request for get an specific article.
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
         * Makes the request for store a newly created article on the API.
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
        }

        /**
         * Makes the request for update article on the API.
         *
         * @param  object data
         * @return Angular promise
         */
        self.update = function (data)
        {
            var article = angular.copy(data);
            var deferredPromise = self.qService.defer();
            var requestUrl = self.requestUrl + '/' + data.id;

            article.tags = self.getIds(article.tags);
            article.categories = self.getIds(article.categories);

            self.httpService.put(requestUrl, article).then(
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
         * Makes the request for delete article on the API.
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

        /**
         * Return only ids from an array of objects.
         *
         * @param  array data
         * @return array
         */
        self.getIds = function (data)
        {
            var ids = [];

            angular.forEach(data, function (item, key) {
                ids.push(item.id);
            });

            return ids;
        }
    }
]);
