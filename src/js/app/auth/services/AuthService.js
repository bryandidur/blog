/*
|--------------------------------------------------------------------------
| Authentication Service
|--------------------------------------------------------------------------
|
*/

authModule.service('AuthService', [
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
        self.requestUrl = api_url('auth');

        /**
         * Fillable authentication session data.
         *
         * @type array
         */
        self.fillableSessionData = ['access_token', 'user', 'authenticated'];

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
         * Makes the request for the user authentication.
         *
         * @param  object credentials
         * @return Angular promise
         */
        self.authenticate = function (credentials)
        {
            var deferredPromise = self.qService.defer();

            self.httpService.post(self.requestUrl, credentials).then(
                function (response)
                {
                    self.setSessionData(angular.extend(response.data, {authenticated: true}));

                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    self.clearSessionData();

                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        };

        /**
         * Makes the request for the user unauthentication.
         *
         * @return Angular promise
         */
        self.unAuthenticate = function ()
        {
            var deferredPromise = self.qService.defer();

            self.httpService.delete(self.requestUrl).then(
                function (response)
                {
                    self.clearSessionData();

                    deferredPromise.resolve(response);
                },
                function (response)
                {
                    self.clearSessionData();

                    deferredPromise.reject(response);
                }
            );

            return deferredPromise.promise;
        };

        /**
         * Check if user is authenticated by getting the
         * authenticated key on the local storage.
         *
         * @return bool
         */
        self.isAuthenticated = function () {
            return self.getSessionData('authenticated') || false;
        };

        /**
         * Get user data from local storage.
         *
         * @return object
         */
        self.getUser = function ()
        {
            return angular.fromJson(self.getSessionData('user'));
        };

        /**
         * Get authentication session data from local storage by its name.
         *
         * @param  string name
         * @return string|null
         */
        self.getSessionData = function (name)
        {
            if ( typeof name == 'undefined' ) {
                var data = {};

                self.fillableSessionData.forEach(function (value, key) {
                    if ( localStorage.getItem(value) ) {
                        data[value] = localStorage.getItem(value);
                    }
                });

                return data;
            }

            if ( self.fillableSessionData.indexOf(name) > -1 ) {
                return localStorage.getItem(name);
            }

            return null;
        };

        /**
         * Set authentication session data on local storage.
         *
         * @param  string name
         * @param  mixed  value
         * @return string|null
         */
        self.setSessionData = function (name, value)
        {
            var key, value, data = {};

            if ( typeof name == 'object' ) {
                for (key in name) {
                    if ( self.fillableSessionData.indexOf(key) > -1 ) {
                        data[key] = name[key];
                        value = (typeof name[key] == 'object') ? angular.toJson(name[key]) :
                           (key == 'access_token') ? 'Bearer ' + name[key] : name[key];

                        localStorage.setItem(key, value);
                    }
                }

                return data;
            }

            if ( self.fillableSessionData.indexOf(name) > -1 ) {
                data[name] = value;

                localStorage.setItem(name, value);

                return data;
            }

            return null;
        };

        /**
         * Remove the authentication session data from local storage by its name.
         *
         * @param  string name
         * @return bool|void
         */
        self.clearSessionData = function (name)
        {
            if ( self.fillableSessionData.indexOf(name) > -1 ) {
                localStorage.removeItem(name);
                return true;
            }

            self.fillableSessionData.forEach(function (value, key) {
                localStorage.removeItem(value);
            });
        };
    }
]);
