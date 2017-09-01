'use strict';

authModule.service('AuthService', [
    '$http',
    function ($http)
    {
        var self = this;
        var apiRequestUrl = api_url('auth');
        var fillableSessionData = ['access_token', 'user', 'authenticated'];

        this.getUser = function ()
        {
            return angular.fromJson(self.getSessionData('user'));
        };

        this.isAuthenticated = function () {
            return self.getSessionData('authenticated') || false;
        };

        this.authenticate = function (credentials, callbacks)
        {
            var callbacks = callbacks || {};
            var promises = {
                success: function (response)
                {
                    self.succeededLogin(response, callbacks);
                },
                error: function (response)
                {
                    self.failedLogin(response, callbacks);
                },
            };

            $http.post(apiRequestUrl, credentials).then(promises.success, promises.error);
        }

        this.succeededLogin = function (response, callbacks)
        {
            angular.extend(response.data, {authenticated: true});

            self.setSessionData(response.data);

            if ( callbacks.success ) callbacks.success(response);
        }

        this.failedLogin = function (response, callbacks)
        {
            self.clearSessionData();

            if ( callbacks.error ) callbacks.error(response);
        }

        this.unAuthenticate = function (callbacks)
        {
            var callbacks = callbacks || {};
            var promises = {
                success: function (response)
                {
                    self.succeededLogout(response, callbacks);
                },
                error: function (response)
                {
                    self.failedLogout(response, callbacks);
                }
            };

            $http.delete(apiRequestUrl).then(promises.success, promises.error);
        }

        this.succeededLogout = function (response, callbacks)
        {
            self.clearSessionData();

            if ( callbacks.success ) callbacks.success(response);
        }

        this.failedLogout = function (response, callbacks)
        {
            self.clearSessionData();

            if ( callbacks.error ) callbacks.error(response);
        }


        this.getSessionData = function (name)
        {
            if ( typeof name == 'undefined' ) {
                var data = {};

                fillableSessionData.forEach(function (value, key) {
                    if ( localStorage.getItem(value) ) {
                        data[value] = localStorage.getItem(value);
                    }
                });

                return data;
            }

            if ( fillableSessionData.indexOf(name) > -1 ) {
                return localStorage.getItem(name);
            }

            return null;
        }

        this.setSessionData = function (name, value)
        {
            var key, value, data = {};

            if ( typeof name == 'object' ) {
                for (key in name) {
                    if ( fillableSessionData.indexOf(key) > -1 ) {
                        data[key] = name[key];
                        value = (typeof name[key] == 'object') ? angular.toJson(name[key]) :
                           (key == 'access_token') ? 'Bearer ' + name[key] : name[key];

                        localStorage.setItem(key, value);
                    }
                }

                return data;
            }

            if ( fillableSessionData.indexOf(name) > -1 ) {
                data[name] = value;

                localStorage.setItem(name, value);

                return data;
            }

            return null;
        }

        this.clearSessionData = function (name)
        {
            if ( fillableSessionData.indexOf(name) > -1 ) {
                localStorage.removeItem(name);
                return true;
            }

            fillableSessionData.forEach(function (value, key) {
                localStorage.removeItem(value);
            });
        }
    }
]);
