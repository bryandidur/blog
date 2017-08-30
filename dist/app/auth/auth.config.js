'use strict';

authModule.factory('AuthInterceptor', [
    '$q', '$location',
    function ($q, $location) {
        this.request = function (request) {
            var access_token = localStorage.getItem('access_token');

            if ( ! access_token ) {
                $location.url('login');
            }

            // Add Authorization header to all requests
            request.headers.Authorization = access_token;

            return request;
        };

        this.response = function (response) {
            // Get the refreshed Authorization header and stores it
            var authorizationHeader = response.headers('Authorization');
            if ( authorizationHeader ) {
                localStorage.setItem('access_token', authorizationHeader);
            }

            return response;
        };

        this.requestError = function (rejection) {
            return $q.reject(rejection);
        };

        this.responseError = function (rejection) {
            var status = rejection.status;

            if ( status == 401 ) {
                $location.url('login');
            }

            return $q.reject(rejection);
        };

        return this;
    }
]);

authModule.config([
    '$httpProvider',
    function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    }
]);
