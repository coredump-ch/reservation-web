var app = angular.module('reservationsApp');

app.config(function($resourceProvider, $httpProvider, API_TOKEN) {

    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;

    // Add token authorization header to all requests
    $httpProvider.defaults.headers.common['Authorization'] = 'Token ' + API_TOKEN;

});

app.factory('Reservation', ['$resource', 'API_URL', function($resource, API_URL) {
    return $resource(API_URL + 'reservations/:id', {}, {
        query: {
            isArray: true,
            method: 'GET',
            transformResponse: function(data, headers) {
                return JSON.parse(data).results;
            }
        }
    });
}]);
