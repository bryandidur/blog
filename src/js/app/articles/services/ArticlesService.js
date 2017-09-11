
articlesModule.service('ArticlesService', [
    '$q', '$http',
    function ($q, $http)
    {
        var self = this;
        self.requestUrl = api_url('admin/articles');
        self.qService = $q;
        self.httpService = $http;

        /**
         * Get all articles.
         *
         * @return Angular promise
         */
        self.all = function ()
        {
            var qDeferred = self.qService.defer();

            self.httpService.get(self.requestUrl).then(
                function (response)
                {
                    qDeferred.resolve(response);
                },
                function (response)
                {
                    qDeferred.reject(response);
                }
            );

            return qDeferred.promise;
        }

        /**
         * Find an specific article.
         *
         * @param  number id
         * @return Angular promise
         */
        self.find = function (id)
        {
            var qDeferred = self.qService.defer();
            var requestUrl = self.requestUrl + '/' + id;

            self.httpService.get(requestUrl).then(
                function (response)
                {
                    qDeferred.resolve(response);
                },
                function (response)
                {
                    qDeferred.reject(response);
                }
            );

            return qDeferred.promise;
        }

        /**
         * Stores the article.
         *
         * @param  object data
         * @return Angular promise
         */
        self.store = function (data)
        {
            var qDeferred = self.qService.defer();

            self.httpService.post(self.requestUrl, data).then(
                function (response)
                {
                    qDeferred.resolve(response);
                },
                function (response)
                {
                    qDeferred.reject(response);
                }
            );

            return qDeferred.promise;
        }

        /**
         * Update an article.
         *
         * @param  object data
         * @return Angular promise
         */
        self.update = function (data)
        {
            var article = angular.copy(data);
            var qDeferred = self.qService.defer();
            var requestUrl = self.requestUrl + '/' + data.id;

            article.tags = self.getIds(article.tags);
            article.categories = self.getIds(article.categories);

            self.httpService.put(requestUrl, article).then(
                function (response)
                {
                    qDeferred.resolve(response);
                },
                function (response)
                {
                    qDeferred.reject(response);
                }
            );

            return qDeferred.promise;
        }

        /**
         * Delete the article.
         *
         * @param  number id
         * @return Angular promise
         */
        self.destroy = function (id)
        {
            var qDeferred = self.qService.defer();
            var requestUrl = self.requestUrl + '/' + id;

            self.httpService.delete(requestUrl).then(
                function (response)
                {
                    qDeferred.resolve(response);
                },
                function (response)
                {
                    qDeferred.reject(response);
                }
            );

            return qDeferred.promise;
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
