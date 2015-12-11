var app = angular.module('reservationsApp');

app.config(function($resourceProvider, $httpProvider, config) {

    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;

    // Add token authorization header to all requests
    $httpProvider.defaults.headers.common['Authorization'] = 'Token ' + config.API_TOKEN;

});

app.factory('Reservation', ['$resource', 'config', function($resource, config) {
    return $resource(config.API_URL + 'reservations/:id', {}, {
        query: {
            isArray: true,
            method: 'GET',
            transformResponse: function(data, headers) {
                return JSON.parse(data).results;
            }
        },
        save: {
            method: 'POST',
            transformRequest: function(reservation, headers) {
                // Validation
                if (reservation === undefined) {
                    return reservation;
                }

                // Convert hours to minutes
                reservation.duration *= 60;

                // Serialize to JSON
                return JSON.stringify(reservation);
            }
        }
    });
}]);
